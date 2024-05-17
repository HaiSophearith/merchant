import { NavItemType } from "../types/types";
import { FormattedMessage } from "react-intl";
import DashboardIcon from "../ui-component/DashboardIcon";
import MerchantIcon from "../ui-component/MerchantIcon";
import KhqrIcon from "../ui-component/KhqrIcon";
import ReferralIcon from "../ui-component/ReferralIcon";
import ReportIcon from "../ui-component/ReportIcon";
import AnnounceIcon from "../ui-component/AnnounceIcon";
import BranchIcon from "../ui-component/BranchIcon";
import AditLogIcon from "../ui-component/AditLogIcon";
import UserIcon from "../ui-component/UserIcon";
import FeedbackIcon from "../ui-component/FeebackIcon";

const navs: NavItemType = {
  id: "group",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: <FormattedMessage id="Dashboard" defaultMessage={"Dashboard"} />,
      type: "item",
      icon: DashboardIcon,
      url: "/dashboard",
    },
    {
      id: "merchant",
      title: (
        <FormattedMessage
          id="Merchant Application"
          defaultMessage={"Merchant Application"}
        />
      ),
      type: "collapse",
      icon: MerchantIcon,
      children: [
        {
          id: "businesses",
          title: (
            <>
              <FormattedMessage
                id="Business Management"
                defaultMessage={"Business Management"}
              />
            </>
          ),
          type: "item",
          url: "/merchant/businesses",
          elements: [
            {
              id: "create-business",
              title: (
                <>
                  <FormattedMessage
                    id="Create Business"
                    defaultMessage={"Create Business"}
                  />
                </>
              ),
              type: "action",
              url: "/merchant/businesses/business/create",
            },
            {
              id: "view-business",
              title: (
                <>
                  <FormattedMessage
                    id="View Business"
                    defaultMessage={"View Business"}
                  />
                </>
              ),
              type: "action",
              url: `/merchant/businesses/:id`,
            },
            {
              id: "view-business-shop",
              title: (
                <>
                  <FormattedMessage
                    id="View Shop"
                    defaultMessage={"View Shop"}
                  />
                </>
              ),
              type: "action",
              url: "/merchant/businesses/:businessId/shops",
            },
            {
              id: "edit-business",
              title: (
                <>
                  <FormattedMessage
                    id="Edit Business"
                    defaultMessage={"Edit Business"}
                  />
                </>
              ),
              type: "action",
              url: `/merchant/businesses/:id/update`,
            },
            {
              id: "create-shop",
              title: (
                <>
                  <FormattedMessage
                    id="Create Shop"
                    defaultMessage={"Create Shop"}
                  />
                </>
              ),
              type: "action",
              url: "/merchant/businesses/:businessId/shop/create",
            },
            {
              id: "view-shop",
              title: (
                <>
                  <FormattedMessage
                    id="View Shop"
                    defaultMessage={"View Shop"}
                  />
                </>
              ),
              type: "action",
              url: "/merchant/businesses/:businessId/shops/:shopId",
            },
            {
              id: "update-shop",
              title: (
                <>
                  <FormattedMessage
                    id="Update Shop"
                    defaultMessage={"Update Shop"}
                  />
                </>
              ),
              type: "action",
              url: "/merchant/businesses/:businessId/shop/:shopId/update",
            },
            {
              id: "create-business-counter",
              title: (
                <>
                  <FormattedMessage
                    id="Create Counter"
                    defaultMessage={"Create Counter"}
                  />
                </>
              ),
              type: "action",
              url: `/merchant/businesses/:businessId/shop/:shopId/counter/create`,
            },
            {
              id: "view-business-counter",
              title: (
                <>
                  <FormattedMessage
                    id="View Counter"
                    defaultMessage={"View Counter"}
                  />
                </>
              ),
              type: "action",
              url: `/merchant/businesses/:businessId/shop/:shopId/counters/:counterId`,
            },
            {
              id: "update-business-counter",
              title: (
                <>
                  <FormattedMessage
                    id="Update Counter"
                    defaultMessage={"Update Counter"}
                  />
                </>
              ),
              type: "action",
              url: `/merchant/businesses/:businessId/shop/:shopId/counter/:counterId/update`,
            },
          ],
        },
        {
          id: "reset-merchant-user-pin",
          title: (
            <>
              <FormattedMessage
                id="Reset Merchant User PIN"
                defaultMessage={"Reset Merchant User PIN"}
              />
            </>
          ),
          type: "item",
          url: "/merchant/pin",
        },
        {
          id: "merchant-history",
          title: (
            <>
              <FormattedMessage
                id="Merchant History"
                defaultMessage={"Merchant History"}
              />
            </>
          ),
          type: "item",
          url: "/merchant/histories",
        },
      ],
    },
    {
      id: "khqr",
      title: <FormattedMessage id="KHQR" defaultMessage={"KHQR"} />,
      type: "collapse",
      icon: KhqrIcon,
      children: [
        {
          id: "materials",
          title: (
            <>
              <FormattedMessage
                id="Material Management"
                defaultMessage={"Material Management"}
              />
            </>
          ),
          type: "item",
          url: "/khqr/materials",
        },
        {
          id: "material-req",
          title: (
            <>
              <FormattedMessage
                id="Material Request"
                defaultMessage={"Material Request"}
              />
            </>
          ),
          type: "item",
          url: "/khqr/material-req",
          elements: [
            {
              id: "create-request",
              title: (
                <>
                  <FormattedMessage
                    id="Create Request"
                    defaultMessage={"Create Request"}
                  />
                </>
              ),
              type: "action",
              url: "/khqr/material-req/create",
            },
            {
              id: "edit-request",
              title: (
                <>
                  <FormattedMessage
                    id="Edit Request"
                    defaultMessage={"Edit Request"}
                  />
                </>
              ),
              type: "action",
              url: "/khqr/material-req/:materialRequestId/create",
            },
            {
              id: "view-request",
              title: (
                <>
                  <FormattedMessage
                    id="Request Detail"
                    defaultMessage={"Request Detail"}
                  />
                </>
              ),
              type: "action",
              url: "/khqr/material-req/:materialRequestId/detail",
            },
          ],
        },
        {
          id: "material-request-non-login",
          title: (
            <>
              <FormattedMessage
                id="Material Request (non-login)"
                defaultMessage={"Material Request (non-login)"}
              />
            </>
          ),
          type: "item",
          url: "/khqr/req-non-login",
        },
      ],
    },
    {
      id: "referral",
      title: <FormattedMessage id="Referral" defaultMessage={"Referral"} />,
      type: "item",
      icon: ReferralIcon,
      url: "/referral",
      elements: [
        {
          id: "view-referral",
          title: (
            <FormattedMessage
              id="View Referral"
              defaultMessage={"View Referral"}
            />
          ),
          type: "action",
          url: "/referral/:referralId",
        },
      ],
    },
    {
      id: "report",
      title: <FormattedMessage id="Report" defaultMessage={"Report"} />,
      icon: ReportIcon,
      url: "/report",
      type: "collapse",
      children: [
        {
          id: "merchant-and-account-status",
          title: (
            <FormattedMessage
              id="MerchantAndAccountStatus"
              defaultMessage={"Merchant and Account Status"}
            />
          ),
          type: "item",
          url: "/report/status",
        },
        {
          id: "merchant-payment-summary",
          title: (
            <>
              <FormattedMessage
                id="MerchantPaymentSummary"
                defaultMessage={"Summary Merchant Payment"}
              />
            </>
          ),
          type: "item",
          url: "/report/payment",
        },
        {
          id: "MerchantCategory",
          title: (
            <>
              <FormattedMessage
                id="MerchantCategory"
                defaultMessage={"Merchant By Category & Type"}
              />
            </>
          ),
          type: "item",
          url: "/report/categories",
        },
        {
          id: "MerchantReferralStaffReport",
          title: (
            <>
              <FormattedMessage
                id="MerchantReferralStaffReport"
                defaultMessage={"Merchant by Staff Referral ID"}
              />
            </>
          ),
          type: "item",
          url: "/report/staff-referralId",
        },
        {
          id: "MerchantReferralReport",
          title: (
            <>
              <FormattedMessage
                id="MerchantReferralReport"
                defaultMessage={"Merchant by Merchant Referral ID"}
              />
            </>
          ),
          type: "item",
          url: "/report/merchant-referralId",
        },
      ],
    },
    {
      id: "feedback",
      title: (
        <FormattedMessage
          id="Customer Feedback"
          defaultMessage={"Customer Feedback"}
        />
      ),
      type: "item",
      icon: FeedbackIcon,
      url: "/feedback",
      elements: [
        {
          id: "view-customer-feedback",
          title: (
            <FormattedMessage
              id="view-customer-feedback"
              defaultMessage={"View Customer Feedback"}
            />
          ),
          type: "action",
          url: `/feedback/:id`,
        },
      ],
    },
    {
      id: "announcement",
      title: (
        <FormattedMessage id="Announcement" defaultMessage={"Announcement"} />
      ),
      type: "item",
      icon: AnnounceIcon,
      url: "/announcement",
      elements: [
        {
          id: "create-announcement",
          title: (
            <>
              <FormattedMessage
                id="Create Announcement"
                defaultMessage={"Create Announcement"}
              />
            </>
          ),
          type: "action",
          url: "announcement/create",
        },
        {
          id: "edit-announcement",
          title: (
            <>
              <FormattedMessage
                id="Edit Announcement"
                defaultMessage={"Edit Announcement"}
              />
            </>
          ),
          type: "action",
          url: "/announcement/:announcementId/update",
        },
      ],
    },
    {
      id: "branches",
      title: (
        <FormattedMessage
          id="KB PRASAC Branch"
          defaultMessage={"KB PRASAC Branch"}
        />
      ),
      type: "item",
      icon: BranchIcon,
      url: "/branches",
      elements: [
        {
          id: "create-branch",
          title: (
            <>
              <FormattedMessage
                id="Create Branch"
                defaultMessage={"Create Branch"}
              />
            </>
          ),
          type: "action",
          url: "/branches/branch/create",
        },
        {
          id: "update-branch",
          title: (
            <>
              <FormattedMessage
                id="Update Branch"
                defaultMessage={"Update Branch"}
              />
            </>
          ),
          type: "action",
          url: "/branches/:branchId/update",
        },
        {
          id: "view-branch",
          title: (
            <>
              <FormattedMessage
                id="View Branch"
                defaultMessage={"View Branch"}
              />
            </>
          ),
          type: "action",
          url: "/branches/:branchId",
        },
      ],
    },
    {
      id: "audit_log",
      title: <FormattedMessage id="Audit Log" defaultMessage={"Audit Log"} />,
      type: "item",
      icon: AditLogIcon,
      url: "/audit_log",
    },
    {
      id: "user",
      title: (
        <FormattedMessage id="Users Setting" defaultMessage={"Users Setting"} />
      ),
      type: "collapse",
      icon: UserIcon,
      children: [
        {
          id: "users",
          title: (
            <>
              <FormattedMessage
                id="Users Management"
                defaultMessage={"Users Management"}
              />
            </>
          ),
          type: "item",
          url: "/user/users",
          elements: [
            {
              id: "create-user",
              title: (
                <>
                  <FormattedMessage
                    id="Create User"
                    defaultMessage={"Create User"}
                  />
                </>
              ),
              type: "action",
              url: "/user/users/create",
            },
          ],
        },
        {
          id: "roles",
          title: (
            <>
              <FormattedMessage
                id="Roles Management"
                defaultMessage={"Roles Management"}
              />
            </>
          ),
          type: "item",
          url: "/user/roles",
          elements: [
            {
              id: "create-role",
              title: (
                <>
                  <FormattedMessage
                    id="Create Role"
                    defaultMessage={"Create Role"}
                  />
                </>
              ),
              type: "action",
              url: "/user/roles/create",
            },
          ],
        },
      ],
    },
  ],
};

const menuItems: { items: NavItemType[] } = {
  items: [navs],
};

export default menuItems;
