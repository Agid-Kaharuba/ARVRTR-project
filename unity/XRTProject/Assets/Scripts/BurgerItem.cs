using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Valve.VR.InteractionSystem;

[RequireComponent(typeof(Interactable))]
public class BurgerItem : MonoBehaviour
{
    private struct RigidbodyConfig
    {
        public float mass;
        public float drag;
        public float angularDrag;
        public bool isKinematic;
        public RigidbodyInterpolation interpolation;
        public RigidbodyConstraints constraints;
        public bool useGravity;
        public CollisionDetectionMode collisionDetectionMode;

        public RigidbodyConfig(Rigidbody rigidbody)
        {
            mass = rigidbody.mass;
            drag = rigidbody.drag;
            angularDrag = rigidbody.angularDrag;
            isKinematic = rigidbody.isKinematic;
            interpolation = rigidbody.interpolation;
            useGravity = rigidbody.useGravity;
            constraints = rigidbody.constraints;
            collisionDetectionMode = rigidbody.collisionDetectionMode;
        }

        public void ApplyTo(Rigidbody rigidbody)
        {
            rigidbody.mass = mass;
            rigidbody.drag = drag;
            rigidbody.angularDrag = angularDrag;
            rigidbody.isKinematic = isKinematic;
            rigidbody.interpolation = interpolation;
            rigidbody.useGravity = useGravity;
            rigidbody.constraints = constraints;
            rigidbody.collisionDetectionMode = collisionDetectionMode;
        }
    }
    
    [SerializeField] private BurgerStackDetector stackDetector;
    [SerializeField] private Transform aboveStickPoint;
    [SerializeField] private Transform belowStickPoint;
    [SerializeField] private Hand.AttachmentFlags attachmentFlags = Hand.AttachmentFlags.DetachOthers |
                                                                    Hand.AttachmentFlags.DetachFromOtherHand |
                                                                    Hand.AttachmentFlags.TurnOffGravity |
                                                                    Hand.AttachmentFlags.VelocityMovement;
    [SerializeField] private bool canStackBelow = true;
    [SerializeField] private bool isBoard;
    
    private const float SnapDistance = 0.06f;
    private Interactable interactable;
    private Rigidbody rb;
    private RigidbodyConfig rigidbodyConfig;
    private Transform unGluedParent;
    private bool isGlued;
    private Hand handToAttachNextFrame;
    private GrabTypes grabTypeNextFrame;
    private BurgerItem gluedItem;
    private BurgerItem gluedFrom;
    private bool isHandHolding;

    public BurgerItem AboveItem => stackDetector ? stackDetector.AboveItem : null;
    public BurgerItem BelowItem => stackDetector ? stackDetector.BelowItem : null;
    public bool IsGlued => isGlued;
    public BurgerItem GluedItem => gluedItem;
    

    private void Awake()
    {
        interactable = GetComponent<Interactable>();
        rb = GetComponent<Rigidbody>();
        unGluedParent = transform.parent;

        if (rb)
        {
            rigidbodyConfig = new RigidbodyConfig(rb);
        }

        if (stackDetector != null)
        {
            stackDetector.SetCurrentItem(this);
        }
        else
        {
            Debug.LogWarning($"{gameObject} is missing a StackDetector");
        }
    }

    private void FixedUpdate()
    {
        if (handToAttachNextFrame != null)
        {
            handToAttachNextFrame.HoverLock(interactable);
            handToAttachNextFrame.AttachObject(gameObject, grabTypeNextFrame, attachmentFlags);
            handToAttachNextFrame = null;
        }
    }

    private void OnCollisionEnter(Collision other)
    {
        TryGlue(other.gameObject);
    }

    private void OnCollisionStay(Collision other)
    {
        TryGlue(other.gameObject);
    }

    private void OnHandHoverBegin(Hand hand)
    {
        Debug.Log($"Hovering with ${hand.handType} over {hand.hoveringInteractable.name}");
    }

    private void HandHoverUpdate(Hand hand)
    {
        GrabTypes startingGrabType = hand.GetGrabStarting();
        bool isGrabEnding = hand.IsGrabEnding(gameObject);

        if (handToAttachNextFrame == null && interactable.attachedToHand == null && startingGrabType != GrabTypes.None)
        {
            isHandHolding = true;
            Debug.Log($"Hand attaching {name}");
            UnGlueBurger();
            
            handToAttachNextFrame = hand;
            grabTypeNextFrame = startingGrabType;
        }
        else if (isGrabEnding)
        {
            Debug.Log($"Hand detaching {name}");
            
            hand.DetachObject(gameObject);
            hand.HoverUnlock(interactable);
            isHandHolding = false;
        }
    }

    private BurgerItem GetTopItem()
    {
        BurgerItem currentItem = this;

        while (currentItem.gluedFrom != null)
        {
            currentItem = currentItem.gluedFrom;
        }

        return currentItem;
    }
    
    private BurgerItem GetBottomItem()
    {
        BurgerItem currentItem = this;

        while (currentItem.gluedItem != null)
        {
            currentItem = currentItem.gluedItem;
        }

        return currentItem;
    }

    private void TryGlue(GameObject otherObject)
    {
        if (!isHandHolding && !isGlued)
        {
            BurgerItem otherBurgerItem = otherObject.GetComponent<BurgerItem>();

            if (otherBurgerItem)
            {
                if (canStackBelow || otherBurgerItem.isBoard)
                {
                    BurgerItem topItem = otherBurgerItem.GetTopItem();
                    Debug.Log($"{name} Collide with {otherBurgerItem}");
                
                    if (BelowItem == topItem && topItem.gluedFrom == null && topItem.aboveStickPoint && Vector3.Distance(belowStickPoint.position, topItem.aboveStickPoint.position) < SnapDistance)
                    {
                        GlueBurger(topItem);
                    }
                }
            }
        }
    }

    private void GlueBurger(BurgerItem otherBurgerItem)
    {
        isGlued = true;
        gluedItem = otherBurgerItem;
        otherBurgerItem.gluedFrom = this;
        
        Destroy(rb);
        transform.SetParent(otherBurgerItem.transform, true);

        if (belowStickPoint != null)
        {
            Vector3 vectorFromBelow = transform.position - belowStickPoint.position;
            transform.position = otherBurgerItem.aboveStickPoint.position + vectorFromBelow;
            transform.rotation = otherBurgerItem.GetBottomItem().transform.rotation;
        }
        else
        {
            Debug.LogWarning($"{gameObject.name} is missing a BelowStickPoint");
        }
    }

    private void UnGlueBurger()
    {
        if (isGlued)
        {
            rb = gameObject.AddComponent<Rigidbody>();
            // TODO fix below
            // rigidbodyConfig.ApplyTo(rb);
            transform.SetParent(unGluedParent, true);

            gluedItem.gluedFrom = null;
            gluedItem = null;
        }
        
        isGlued = false;
    }
}