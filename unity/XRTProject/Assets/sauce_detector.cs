using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class sauce_detector : MonoBehaviour
{   
    private string tagName = "Food Item";
    private int count = 0;
    private bool run = true;
    public GameObject Sauce;
    //private GameObject Sauce = GameObject.Find("Sauce");

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

        if (count != 0)
        {
            count = CountUp();

        }
        else
        {
            if (Physics.Raycast(transform.position, forward, out hit, 2))
            {
                Debug.DrawRay(transform.position, forward, Color.green);
                if (hit.collider.tag == tagName)
                {
                    Debug.Log(hit.collider.name);
                    count++;
                    Vector3 pos = hit.transform.position;
                    Debug.Log("hitting " + hit.collider.name);
                    GameObject sauceNew = Instantiate(Sauce);
                    sauceNew.transform.position = new Vector3(pos.x, pos.y, pos.z + (float) 0.2);
                }
            }
        }
    }

    int CountUp() { // Pauses script for 90 frames otherwise sauce explodes everywhere
        if (count > 90)
        {
            count = 0;
        }
        else
        {
            count++;
        }
        return count;
    }
}
