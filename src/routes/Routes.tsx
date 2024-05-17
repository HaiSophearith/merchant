import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import UserCreatePage from "../views/pages/userSetting/users-management/userAddEditPage/UserCreatePage";
import { useAuthContext } from "../contexts/AuthContext";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import MainLayout from "../layout/MainLayout/MainLayout";
import Loadable from "../ui-component/Loadable";
import ViewReferralPage from "../views/pages/referral/ViewReferralPage";

export const DASHBOARD_URL = "/dashboard";
export const ANNOUNCEMENT_URL = "/announcement";
export const ANNOUNCEMENT_CREATE_URL = "/announcement/create";
export const ANNOUNCEMENT_UPDATE_URL = "/announcement/:announcementId/update";
export const REFERRAL_URL = "/referral";
export const REFERRAL_DETAIL_URL = "/referral/:referralId";
export const BUSINESS_URL = "/merchant/businesses";
export const BUSINESS_CREATE_URL = "/merchant/businesses/create";
export const BUSINESS_UPDATE_URL = "/merchant/businesses/:id/update";
export const BUSINESS_DETAIL_URL = "/merchant/businesses/:id";
export const SHOP_CREATE_URL = "/merchant/businesses/:businessId/shop/create";
export const SHOP_UPDATE_URL =
  "/merchant/businesses/:businessId/shop/:shopId/update";
export const SHOP_DETAIL_URL = "/merchant/businesses/:businessId/shops/:shopId";
export const COUNTER_CREATE_URL =
  "/merchant/businesses/:businessId/shop/:shopId/counter/create";
export const COUNTER_UPDATE_URL =
  "/merchant/businesses/:businessId/shop/:shopId/counter/:counterId/update";
export const COUNTER_DETAIL_URL =
  "/merchant/businesses/:businessId/shop/:shopId/counters/:counterId";
export const VIEW_SHOP = "/merchant/businesses/:businessId/shops";
export const PIN_URL = "/merchant/pin";
export const HISTORIES_URL = "/merchant/histories";
export const FEEDBACK_URL = "/feedback";
export const FEEDBACK_DETAiL_URL = "/feedback/:id";
export const BRANCH_URL = "/branches";
export const BRANCH_CREATE_URL = "/branches/branch/create";
export const BRANCH_UPDATE_URL = "/branches/:branchId/update";
export const BRANCH_DETAIL_URL = "/branches/:branchId";
export const MATERIAL_URL = "/khqr/materials";
export const MATERIAL_REQUEST_NO_LOGIN = "/khqr/req-non-login";
export const AUDIT_LOG = "/audit_log";
export const USER_URl = "/user/users";
export const USER_CREATE_URL = "/user/users/create";
export const ROLE_URL = "/user/roles";
export const ROLE_CREATE_URL = "user/roles/create";
export const REPORT_URL = "/report";
export const MERCHANT_SUMMARY_URL = "/report/payment";
export const MERCHANT_STATUS_URL = "/report/status";
export const MERCHANT_CATEGORIES_URL = "/report/categories";
export const MERCHANT_REFERRAL_URL = "/report/staff-referralId";
export const MERCHANT_REFERRAL_STAFF_URL = "/report/merchant-referralId";
export const MATERIAL_REQUEST_URL = "/khqr/material-req";
export const MATERIAL_REQUEST_CREATE_URL = "/khqr/material-req/create";
export const MATERIAL_REQUEST_UPDATE_URL = `${MATERIAL_REQUEST_URL}/:materialRequestId/update`;
export const MATERIAL_REQUEST_DETAIL_URL = `${MATERIAL_REQUEST_URL}/:materialRequestId/detail`;

const DashboardPage = Loadable(
  lazy(() => import("../views/pages/dashboard/DashboardPage"))
);
const ReferralPage = Loadable(
  lazy(() => import("../views/pages/referral/ReferralPage"))
);
const ReportPage = Loadable(
  lazy(() => import("../views/pages/report/ReportPage"))
);
const CustomerPage = Loadable(
  lazy(() => import("../views/pages/customerFeedback/CustomerPage"))
);
const CustomerDetailPage = Loadable(
  lazy(() => import("../views/pages/customerFeedback/CustomerDetail"))
);
const BranchPage = Loadable(
  lazy(() => import("../views/pages/branchManagement/BranchPage"))
);

const BusinessManagementPage = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/merchantApplication/businessManagement/BusinessManagementPage"
      )
  )
);

const AuditLogPage = Loadable(
  lazy(() => import("../views/pages/auditLog/AuditLogPage"))
);

const ResetMerchantUserPinPage = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/merchantApplication/resetMerchantUserPin/ResetMerchantUserPinPage"
      )
  )
);
const MerchantHistory = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/merchantApplication/merchantHistory/MerchantHistoryPage"
      )
  )
);
const AnnouncementPage = Loadable(
  lazy(() => import("../views/pages/announcement/AnnouncementPage"))
);

const CreateAnnouncementPage = Loadable(
  lazy(() => import("../views/pages/announcement/AnnouncementCreatePage"))
);

const UpdateAnnouncementPage = Loadable(
  lazy(() => import("../views/pages/announcement/AnnouncementUpdatePage"))
);

const MaterialPage = Loadable(
  lazy(() => import("../views/pages/khqr/materialManagement/MaterialPage"))
);

const MaterialRequestPage = Loadable(
  lazy(() => import("../views/pages/khqr/materialRequest/MaterialRequestPage"))
);
const MaterialRequestCreatePage = Loadable(
  lazy(
    () =>
      import("../views/pages/khqr/materialRequest/MaterialRequestCreatePage")
  )
);
const MaterialRequestDetailPage = Loadable(
  lazy(
    () =>
      import("../views/pages/khqr/materialRequest/MaterialRequestDetailPage")
  )
);

const MaterialReqNoLoginPage = Loadable(
  lazy(
    () =>
      import("../views/pages/khqr/materialReqNoLogin/MaterialReqNoLoginPage")
  )
);

const UsersManagementPage = Loadable(
  lazy(
    () =>
      import("../views/pages/userSetting/users-management/UsersManagementPage")
  )
);
const RolesManagementPage = Loadable(
  lazy(
    () =>
      import("../views/pages/userSetting/roles-management/RolesManagementPage")
  )
);

const RoleAddEditPage = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/userSetting/roles-management/roleAddEditPage/RoleCreatePage"
      )
  )
);
const BusinessAddPage = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/merchantApplication/businessManagement/businessCreatePage/BusinessCreatePage"
      )
  )
);

const CounterDetailPage = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/merchantApplication/counterManagement/CounterDetailPage/CounterDetailPage"
      )
  )
);

const LoginPage = lazy(() => import("../views/pages/login/LoginPage"));

const LoginSuccessPage = Loadable(
  lazy(() => import("../views/pages/login/LoginSuccessPage"))
);
const BusinessUpdatePage = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/merchantApplication/businessManagement/businessUpdatePage/BusinessUpdatePage"
      )
  )
);
const CreateCounterPage = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/merchantApplication/counterManagement/CounterCreatePage/CreateCounterPage"
      )
  )
);
const UpdateCounterPage = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/merchantApplication/counterManagement/UpdateCounterPage/UpdateCounterPage"
      )
  )
);
const ViewBusinessPage = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/merchantApplication/businessManagement/viewViaBusiness/ViewBusinessPage"
      )
  )
);
const ViewShops = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/merchantApplication/businessManagement/viewViaBusiness/ViewShops"
      )
  )
);

const CreateShopPage = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/merchantApplication/shopManagement/shopCreatePage/CreateShopPage"
      )
  )
);

const UpdateShopPage = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/merchantApplication/shopManagement/updateShopPage/UpdateShopPage"
      )
  )
);

const ShopDetail = Loadable(
  lazy(
    () =>
      import(
        "../views/pages/merchantApplication/shopManagement/ShopDetailPage/ShopDetailPage"
      )
  )
);

const CreateBranchPage = Loadable(
  lazy(() => import("../views/pages/branchManagement/CreateBranchPage"))
);

const UpdateBranchPage = Loadable(
  lazy(() => import("../views/pages/branchManagement/UpdateBranchPage"))
);

const ViewBranchPage = Loadable(
  lazy(() => import("../views/pages/branchManagement/ViewBranchPage"))
);

const MerchantPaymentSummaryPage = Loadable(
  lazy(() => import("../views/pages/report/MerchantPaymentSummaryPage"))
);

const MerchantAndAccountStatusReportPage = Loadable(
  lazy(() => import("../views/pages/report/MerchantAndAccountStatusPage"))
);

const MerchantCategoryPage = Loadable(
  lazy(() => import("../views/pages/report/MerchantCategoryPage"))
);

const MerchantReferralReportPage = Loadable(
  lazy(() => import("../views/pages/report/MerchantReferralPage"))
);

const StaffReferralReportPage = Loadable(
  lazy(() => import("../views/pages/report/MerchantReferralStaffPage"))
);

export default function Routes() {
  const { isAuthenticated } = useAuthContext();

  return useRoutes([
    {
      path: "/auth",
      element: isAuthenticated ? <Navigate to="/" /> : <AuthLayout />,
      children: [
        {
          path: "",
          element: <Navigate to="/auth/login" />,
        },
        {
          path: "/auth/login",
          element: <LoginPage />,
        },
        {
          path: "/auth/sso",
          element: <LoginSuccessPage />,
        },
        {
          path: "*",
          element: <Navigate to="/auth/login" />,
        },
      ],
    },
    {
      path: "/",
      element: isAuthenticated ? <MainLayout /> : <Navigate to="/auth/login" />,
      children: [
        {
          path: DASHBOARD_URL,
          element: <DashboardPage />,
        },
        {
          path: BUSINESS_URL,
          element: <BusinessManagementPage />,
        },
        {
          path: PIN_URL,
          element: <ResetMerchantUserPinPage />,
        },
        {
          path: HISTORIES_URL,
          element: <MerchantHistory />,
        },
        {
          path: BUSINESS_CREATE_URL,
          element: <BusinessAddPage />,
        },
        {
          path: BUSINESS_UPDATE_URL,
          element: <BusinessUpdatePage />,
        },
        {
          path: BUSINESS_DETAIL_URL,
          element: <ViewBusinessPage />,
        },
        {
          path: VIEW_SHOP,
          element: <ViewShops />,
        },
        {
          path: SHOP_CREATE_URL,
          element: <CreateShopPage />,
        },
        {
          path: COUNTER_CREATE_URL,
          element: <CreateCounterPage />,
        },
        {
          path: COUNTER_UPDATE_URL,
          element: <UpdateCounterPage />,
        },
        {
          path: COUNTER_DETAIL_URL,
          element: <CounterDetailPage />,
        },
        {
          path: SHOP_UPDATE_URL,
          element: <UpdateShopPage />,
        },
        {
          path: SHOP_DETAIL_URL,
          element: <ShopDetail />,
        },
        {
          path: MATERIAL_URL,
          element: <MaterialPage />,
        },
        {
          path: MATERIAL_REQUEST_URL,
          element: <MaterialRequestPage />,
        },
        {
          path: MATERIAL_REQUEST_CREATE_URL,
          element: <MaterialRequestCreatePage />,
        },
        {
          path: MATERIAL_REQUEST_DETAIL_URL,
          element: <MaterialRequestDetailPage />,
        },
        {
          path: MATERIAL_REQUEST_NO_LOGIN,
          element: <MaterialReqNoLoginPage />,
        },
        {
          path: REFERRAL_URL,
          element: <ReferralPage />,
        },
        {
          path: REFERRAL_DETAIL_URL,
          element: <ViewReferralPage />,
        },
        {
          path: REPORT_URL,
          element: <ReportPage />,
        },
        {
          path: MERCHANT_SUMMARY_URL,
          element: <MerchantPaymentSummaryPage />,
        },
        {
          path: ANNOUNCEMENT_URL,
          element: <AnnouncementPage />,
        },
        {
          path: ANNOUNCEMENT_CREATE_URL,
          element: <CreateAnnouncementPage />,
        },
        {
          path: ANNOUNCEMENT_UPDATE_URL,
          element: <UpdateAnnouncementPage />,
        },
        {
          path: FEEDBACK_URL,
          element: <CustomerPage />,
        },
        {
          path: FEEDBACK_DETAiL_URL,
          element: <CustomerDetailPage />,
        },
        {
          path: BRANCH_URL,
          element: <BranchPage />,
        },
        {
          path: BRANCH_CREATE_URL,
          element: <CreateBranchPage />,
        },
        {
          path: BRANCH_DETAIL_URL,
          element: <ViewBranchPage />,
        },
        {
          path: BRANCH_UPDATE_URL,
          element: <UpdateBranchPage />,
        },
        {
          path: AUDIT_LOG,
          element: <AuditLogPage />,
        },
        {
          path: USER_URl,
          element: <UsersManagementPage />,
        },
        {
          path: USER_CREATE_URL,
          element: <UserCreatePage />,
        },
        {
          path: ROLE_URL,
          element: <RolesManagementPage />,
        },
        {
          path: ROLE_CREATE_URL,
          element: <RoleAddEditPage />,
        },
        {
          path: MERCHANT_SUMMARY_URL,
          element: <MerchantPaymentSummaryPage />,
        },
        {
          path: MERCHANT_STATUS_URL,
          element: <MerchantAndAccountStatusReportPage />,
        },
        {
          path: MERCHANT_CATEGORIES_URL,
          element: <MerchantCategoryPage />,
        },
        {
          path: MERCHANT_REFERRAL_URL,
          element: <MerchantReferralReportPage />,
        },
        {
          path: MERCHANT_REFERRAL_STAFF_URL,
          element: <StaffReferralReportPage />,
        },
      ],
    },
  ]);
}
