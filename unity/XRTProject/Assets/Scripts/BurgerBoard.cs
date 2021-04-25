using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BurgerBoard : MonoBehaviour
{
    [SerializeField] BurgerStackDetector stackDetector;

    public List<BurgerItem> GetCurrentBurger()
    {
        var burgerItems = new List<BurgerItem>();
        BurgerItem aboveItem = stackDetector.AboveItem;

        while (aboveItem != null)
        {
            burgerItems.Add(aboveItem);
            aboveItem = aboveItem.AboveItem;
        }

        return burgerItems;
    }
}
