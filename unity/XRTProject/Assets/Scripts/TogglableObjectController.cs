using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TogglableObjectController : MonoBehaviour
{
    [SerializeField] private GameObject targetObject;

    private Toggle toggle;

    private void Awake()
    {
        toggle = GetComponent<Toggle>();

        if (targetObject != null && toggle)
        {
            toggle.onValueChanged.AddListener(OnToggleClicked);
            // Make sure to run the first time for first time setup
            OnToggleClicked(toggle.isOn);
        }
    }

    private void OnToggleClicked(bool isOn)
    {
        targetObject.SetActive(isOn);
    }
}
