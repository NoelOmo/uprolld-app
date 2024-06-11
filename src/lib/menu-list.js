import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    Mail,
    LayoutGrid,
    BarChart4,
    Gem
  } from "lucide-react";

  
  export function getMenuList(pathname) {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/rollups",
            label: "Rollups",
            active: pathname.includes("/rollups"),
            icon: LayoutGrid,
            submenus: []
          }
        ]
      },
      {
        groupLabel: "Menu",
        menus: [
          {
            href: "/unsubscribe",
            label: "Unsubscribe",
            active: pathname.includes("/unsubscribe"),
            icon: Mail,
            submenus: []
          },
          {
            href: "/stats",
            label: "Stats",
            active: pathname.includes("/stats"),
            icon: BarChart4,
            submenus: []
          },
          {
            href: "/promote",
            label: "Promote Newsletter",
            active: pathname.includes("/promote"),
            icon: Gem,
            submenus: []
          }
        ]
      },
      {
        groupLabel: "Settings",
        menus: [
          {
            href: "/account",
            label: "Account",
            active: pathname.includes("/account"),
            icon: Settings,
            submenus: []
          }
        ]
      }
    ];
  }
  