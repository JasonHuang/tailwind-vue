//src utils menu.ts

export interface MenuItem {
    ID: number;
    title: string;
    url: string;
    menu_item_parent: string;
    menu_order: number;
    isMenuVisible: boolean;
    children: MenuItem[];
}

export interface ApiResponse {
    [key: string]: any;
}

export const fetchMenuItems = async (menuType: string): Promise<MenuItem[]> => {
    try {
        const response = await fetch(`http://libofei.com/wp-json/techqik/v1/menu/${menuType}`);
        const data: ApiResponse[] = await response.json();
        return constructMenu(data as MenuItem[]);
    } catch (error) {
        console.error('Error:', error);
        return [];  
    }
};

const constructMenu = (menuItems: MenuItem[]): MenuItem[] => {
    const menuStructure: Record<string, MenuItem> = {};
    menuItems.forEach(item => menuStructure[item.ID] = { ...item, children: [] });
    menuItems.forEach(item => {
        if (item.menu_item_parent !== "0") {
            menuStructure[item.menu_item_parent].children.push(menuStructure[item.ID]);
        }
    });
    return Object.values(menuStructure).filter(item => item.menu_item_parent === "0").sort((a, b) => a.menu_order - b.menu_order);
};