using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TextScript : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        string[] arguments = Environment.GetCommandLineArgs();


        GameObject newGO = new GameObject("myTextGO");
        newGO.transform.SetParent(this.transform);
        newGO.transform.localPosition = Vector3.zero;

        Text myText = newGO.AddComponent<Text>();
        myText.text = arguments[1];

        Font ArialFont = (Font)Resources.GetBuiltinResource(typeof(Font), "Arial.ttf");
        myText.font = ArialFont;
        myText.material = ArialFont.material;
        myText.rectTransform.sizeDelta = new Vector2(300, 300);

    }

    // Update is called once per frame
    void Update()
    {

    }
}
