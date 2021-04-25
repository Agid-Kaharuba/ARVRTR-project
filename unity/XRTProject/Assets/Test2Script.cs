using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Test2Script : MonoBehaviour
{
    //private Rigidbody rb;

    // Start is called before the first frame update
    private void Start()
    {
        //rb = GetComponent<Rigidbody>();

        StartCoroutine(MoveLeft());
    }

    // Update is called once per frame
    private void Update()
    {
        //Vector3 pos = transform.position;
        //pos.x -= 5f * Time.deltaTime;
        //transform.position = pos;

        //rb.AddForce(new Vector3(-1f, 0, 0));

        //rb.MovePosition(transform.position + Vector3.left * 4 * Time.deltaTime);
    }

    private IEnumerator MoveLeft()
    {
        Debug.Log("Started moving");

        for (int i = 0; i < 5; i++)
        {
            transform.position = transform.position + Vector3.left;
            yield return new WaitForSeconds(1f);
        }

        yield return SomeLongAssOperation((num) => {
            Debug.Log($"Hi from callback {num}");
        });
        QuickFunction();
        Debug.Log("Finished moving");
    }

    private IEnumerator SomeLongAssOperation(Action<int> callback)
    {
        yield return new WaitForSeconds(5.0f);
        callback(23174891);
    }

    private void QuickFunction()
    {

    }
}
