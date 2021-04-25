using System;
using UnityEditor;
using UnityEngine;


[CustomEditor(typeof(BurgerItem))]
[CanEditMultipleObjects]
public class BurgerItemEditor : Editor
{
    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();
        
        if (serializedObject.targetObject is BurgerItem burgerItem)
        {
            GUILayout.Space(10);

            if (burgerItem.AboveItem != null)
            {
                GUILayout.Label($"Above Item is {burgerItem.AboveItem}");
            }
            else
            {
                GUILayout.Label($"No Above Item Found");
            }
        
            if (burgerItem.BelowItem != null)
            {
                GUILayout.Label($"Below Item is {burgerItem.BelowItem}");
            }
            else
            {
                GUILayout.Label($"No Below Item Found");
            }

            if (burgerItem.IsGlued)
            {
                GUILayout.Label($"Glued to {burgerItem.GluedItem.name}");
            }
            else
            {
                GUILayout.Label($"Not glued to anything");
            }
        }
    }
}