using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class sauce_detector : MonoBehaviour
{
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
        if (Physics.Raycast(transform.position, forward, out hit))
        {
            Debug.DrawRay(transform.position, forward, Color.green);
            Debug.Log(hit);
            Debug.Log("Did Hit");
        }
        
    }
}
