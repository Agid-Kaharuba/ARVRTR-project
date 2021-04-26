using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class sauce_detector : MonoBehaviour
{   
    private string stackName = "BurgerBoard";  

    // Start is called before the first frame update
    void Start()
    {
        Debug.Log(transform.position);
    }

    // Update is called once per frame
    void Update()
    {
        RaycastHit hit;
        Vector3 forward = transform.TransformDirection(Vector3.forward)*1;
        //Ray
        if (Physics.Raycast(transform.position, forward, out hit, 2))
        {
            Debug.DrawRay(transform.position, forward, Color.green);
            if (hit.collider.name.Contains(stackName)){
                Debug.Log("hitting " + hit.collider.name);
            }
            /*if (hit.collider.name == "hittingStackCollider")
            {
                Debug.Log("hitting" + hit.collider.name);
            }*/
            //Debug.Log("Did Hit");
        }
        
    }
}
