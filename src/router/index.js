import {createRouter, createWebHistory} from "vue-router";
import Default from "../views/dashboards/Default.vue";
import Sales from "../views/dashboards/Sales.vue";
import Overview from "../views/pages/profile/Overview.vue";
import Projects from "../views/pages/profile/Projects.vue";
import Timeline from "../views/pages/projects/Timeline.vue";
import Pricing from "../views/pages/Pricing.vue";
import RTL from "../views/pages/Rtl.vue";
import Charts from "../views/pages/Charts.vue";
import Notifications from "../views/pages/Notifications.vue";
import Kanban from "../views/applications/Kanban.vue";
import Wizard from "../views/applications/wizard/Wizard.vue";
import DataTables from "../views/applications/DataTables.vue";
import Calendar from "../views/applications/Calendar.vue";
import NewProduct from "../views/ecommerce/products/NewProduct.vue";
import EditProduct from "../views/ecommerce/products/EditProduct.vue";
import ProductPage from "../views/ecommerce/products/ProductPage.vue";
import OrderDetails from "../views/ecommerce/orders/OrderDetails";
import OrderList from "../views/ecommerce/orders/OrderList";
import NewUser from "../views/pages/users/NewUser.vue";
import Settings from "../views/pages/account/Settings.vue";
import Billing from "../views/pages/account/Billing.vue";
import Invoice from "../views/pages/account/Invoice.vue";
import Widgets from "../views/pages/Widgets.vue";
import Basic from "../views/auth/signin/Basic.vue";
import Cover from "../views/auth/signin/Cover.vue";
import ResetCover from "../views/auth/reset/Cover.vue";
import SignupCover from "../views/auth/signup/Cover.vue";

const routes = [
    {
        path: "/",
        name: "/",
        redirect: "/dashboards/home",
    },
    {
        path: "/dashboards/dashboard-default",
        name: "Default",
        component: Default,
    },
    {
        path: "/dashboards/sales",
        name: "Sales",
        component: Sales,
    },
    {
        path: "/pages/profile/overview",
        name: "Profile Overview",
        component: Overview,
    },
    {
        path: "/pages/profile/projects",
        name: "All Projects",
        component: Projects,
    },
    {
        path: "/pages/projects/timeline",
        name: "Timeline",
        component: Timeline,
    },
    {
        path: "/pages/pricing-page",
        name: "Pricing Page",
        component: Pricing,
    },
    {
        path: "/pages/rtl-page",
        name: "RTL",
        component: RTL,
    },
    {
        path: "/pages/charts",
        name: "Charts",
        component: Charts,
    },
    {
        path: "/pages/widgets",
        name: "Widgets",
        component: Widgets,
    },
    {
        path: "/pages/notifications",
        name: "Notifications",
        component: Notifications,
    },
    {
        path: "/applications/kanban",
        name: "Kanban",
        component: Kanban,
    },
    {
        path: "/applications/wizard",
        name: "Wizard",
        component: Wizard,
    },
    {
        path: "/applications/data-tables",
        name: "Data Tables",
        component: DataTables,
    },
    {
        path: "/applications/calendar",
        name: "Calendar",
        component: Calendar,
    },
    {
        path: "/ecommerce/products/new-product",
        name: "New Product",
        component: NewProduct,
    },
    {
        path: "/ecommerce/products/edit-product",
        name: "Edit Product",
        component: EditProduct,
    },
    {
        path: "/ecommerce/products/product-page",
        name: "Product Page",
        component: ProductPage,
    },
    {
        path: "/ecommerce/Orders/order-details",
        name: "Order Details",
        component: OrderDetails,
    },
    {
        path: "/ecommerce/Orders/order-list",
        name: "Order List",
        component: OrderList,
    },
    {
        path: "/pages/users/new-user",
        name: "New User",
        component: NewUser,
    },
    {
        path: "/pages/account/settings",
        name: "Settings",
        component: Settings,
    },
    {
        path: "/pages/account/billing",
        name: "Billing",
        component: Billing,
    },
    {
        path: "/pages/account/invoice",
        name: "Invoice",
        component: Invoice,
    },
    {
        path: "/authentication/signin/basic",
        name: "Signin Basic",
        component: Basic,
    },
    {
        path: "/authentication/signin/cover",
        name: "Signin Cover",
        component: Cover,
    },
    {
        path: "/authentication/reset/cover",
        name: "Reset Cover",
        component: ResetCover,
    },
    {
        path: "/authentication/signup/cover",
        name: "Signup Cover",
        component: SignupCover,
    },
    //自定义页面
    {
        path: "/login",
        name: "Login Page",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/Login.vue"),
    },
    {
        path: "/dashboards/PatientInfo",
        name: "病人信息",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/PatientInfo.vue"),
    },
    {
        path: "/dashboards/DiseaseBank",
        name: "疾病庫",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/DiseaseBank.vue"),
    },
    {
        path: "/dashboards/Home",
        name: "首頁",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/Home.vue"),
    },
    {
        path: "/dashboards/EmployeeManagement",
        name: "員工管理",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/EmployeeManagement.vue"),
    },
    {
        path: "/info/MQTTDemo",
        name: "攝像頭實時畫面",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/MQTTDemo.vue"),
    },
    {
        path: "/info/MultiScreen",
        name: "查看房間",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/MultiScreen.vue"),
    },
    {
        path: "/info/RoomsInfo",
        name: "房間管理",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/RoomsInfo.vue"),
    },
    {
        path: "/info/SingleRoom",
        name: "房間內容",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/SingleRoom.vue"),
    },
    {
        path: "/info/Map",
        name: "無人機配送地圖",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/Map.vue"),
    },
    {
        path: "/info/DroneManage",
        name: "無人機管理",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/DroneManage.vue"),
    },
    {
        path: "/info/WarehouseManage",
        name: "無人機站点",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/WarehouseManage.vue"),
    }
,
    {
        path: "/info/MonitorEquipmentManage",
        name: "監測設備管理",
        component: () =>
            import(/* webpackChunkName: "HomePage" */ "../pages/MonitorEquipmentManage.vue"),
    }

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "active",
});

export default router;
