using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BurgerStackDetector : MonoBehaviour
{
    private List<BurgerItem> surroundingItems = new List<BurgerItem>();
    private BurgerItem currentItem;
    
    public BurgerItem AboveItem { get; private set; }
    public BurgerItem BelowItem { get; private set; }

    public void SetCurrentItem(BurgerItem burgerItem)
    {
        currentItem = burgerItem;
    }
    
    private void OnTriggerEnter(Collider other)
    {
        BurgerItem item = other.GetComponent<BurgerItem>();

        if (item != null && item != currentItem)
        {
            surroundingItems.Add(item);
            SetupSurroundingItems();
        }
    }

    private void OnTriggerExit(Collider other)
    {
        BurgerItem item = other.GetComponent<BurgerItem>();

        if (item != null && item != currentItem)
        {
            surroundingItems.Remove(item);
            SetupSurroundingItems();
        }
    }

    private void SetupSurroundingItems()
    {
        BurgerItem bestAboveItem = null;
        Vector3 bestAbovePosition = Vector3.positiveInfinity;
        BurgerItem bestBelowItem = null;
        Vector3 bestBelowPosition = Vector3.negativeInfinity;

        foreach (BurgerItem item in surroundingItems) 
        {
            if (item.transform.position.y > transform.position.y && item.transform.position.y < bestAbovePosition.y)
            {
                bestAboveItem = item;
                bestAbovePosition = item.transform.position;
            }

            if (item.transform.position.y < transform.position.y && item.transform.position.y > bestBelowPosition.y)
            {
                bestBelowItem = item;
                bestBelowPosition = item.transform.position;
            }
        }

        AboveItem = bestAboveItem;
        BelowItem = bestBelowItem;
    }
}
