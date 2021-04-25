using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WorkTaskManager : MonoBehaviour
{
    public static WorkTaskManager Instance { get; private set; }

    private void Awake()
    {
        if (Instance != null)
        {
            Destroy(this);
            return;
        }

        Instance = this;
    }
    
    private void Update()
    {
        
    }
}
