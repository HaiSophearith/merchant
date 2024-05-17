import React, { FunctionComponent, ReactElement, ReactNode } from "react";
import { SvgIconTypeMap, ChipProps } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export interface ErrorInfo {
  reason: string;
  code: string;
}

export enum MATERIAL_REQUEST_RECEIVING_METHOD {
  DELIVERY = "DELIVERY",
  PICK_UP = "PICK_UP",
}

export enum MATERIAL_REQUEST_STATUS {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  PICK_UP = "PICK_UP",
  DELIVERING = "DELIVERING",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum STATUS_LABEL {
  Verified = "VERIFIED",
  Unverified = "UNVERIFIED",
  Escalated = "ESCALATED",
  Draft = "DRAFT",
  Published = "PUBLISHED",
}

export enum REFERRAL_TYPE {
  staff = "STAFF",
  merchant = "MERCHANT",
}

export interface Regional {
  id: string;
  name: string;
}

export interface Referral {
  id: string;
  referralCode: string;
  onboardedDate: Date;
  referrerName?: string;
  phoneNumber?: string;
  type: REFERRAL_TYPE;
}

export interface RefereeProps {
  fullName: string;
  phoneNumber: string;
  onBoarded: boolean;
}

export interface ReferralDetail extends Referral {
  referrerCustomer: RefereeProps;
  business: Business;
}

export interface ReferralProps extends Referral {
  referrerCustomer: RefereeProps;
}

export interface FilterReferral extends Pagination {
  query?: string | null;
  branchId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export interface Branch {
  khmerName?: string;
  branchCode: string;
  phoneNumber?: string;
  name: string;
  address?: string;
  khmerAddress?: string;
  latitude: number;
  longitude: number;
  description?: string;
  enabled?: boolean;
  email?: string;
  logoUrl?: string;
}

export interface BranchProps extends Branch {
  regional: Regional;
  province: Location;
  phoneNumber: string;
  timeOpen?: string;
  id?: string;
}

export interface RequestBranchProps extends Branch {
  provinceId?: string;
  regionalId?: string;
}

export type OverrideIcon =
  | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    })
  | React.ComponentClass<any>
  | FunctionComponent<any>;

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon;
  color?: string;
  size?: string;
}

export interface FilterBranch extends Pagination {
  query?: string;
  provinceId?: string;
}

export interface Employee {
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  id: string;
  role: string;
}

export interface TipProps {
  businessId: string;
  shopId: string;
}

export type NavItemType = {
  id?: string;
  icon?: GenericCardProps["iconPrimary"];
  target?: boolean;
  external?: boolean;
  url?: string | undefined;
  type?: string;
  title?: ReactNode | string;
  color?: "primary" | "secondary" | "default" | undefined;
  caption?: ReactNode | string;
  breadcrumbs?: boolean;
  disabled?: boolean;
  chip?: ChipProps;
  children?: NavItemType[];
  elements?: NavItemType[];
  search?: string;
};

export type GuardProps = {
  children: ReactElement | null;
};

export type HeadCell = {
  id: string;
  label: string;
  numeric?: boolean;
  disablePadding?: string | boolean | undefined;
  align?: "left" | "right" | "inherit" | "center" | "justify" | undefined;
};

export interface UserProps {
  no: number;
  staffId: number;
  fullName: string;
  role: string;
  branch: string;
  status: string;
}

interface AccountOwner {
  cbsCustId?: string;
  phoneNumber?: string;
}

export interface Business {
  name: string;
  no: string;
  logoUrl: string;
  status: STATUS_LABEL;
  merchantType: MerchantType.corporate;
  enabled: boolean;
  nameType: NameType.officialName;
}

export interface BusinessProps extends Business {
  id: string;
  category: BusinessCategories;
  shopCount: number;
  referralCode: string;
  owner: AccountOwner;
  createdDate?: String;
}

export interface Customer {
  fullName: string;
  phoneNumber: string;
  cbsCustId: string;
  referralCode: string;
  onBoarded: false;
}

export interface CustomerFeedback {
  id: string;
  type: string;
  description: string;
  status: string;
  submitDate: Date;
  customer: Customer;
}

export interface Document {
  url: string;
  id?: string;
}

export interface BusinessDetailProps extends BusinessProps {
  supportedDocuments: Document[];
  creationDocuments: Document[];
}
export interface Pagination {
  limit: number;
  pageNumber: number;
}

export interface FilterEmployee extends Pagination {
  shopId?: string;
  counterId?: string;
}

export interface FilterBusiness extends Pagination {
  query?: string;
  status?: string;
  merchantType?: string;
  categoryId?: string;
}

export interface FilterShop extends Pagination {
  query?: string;
  businessId: string;
  businessStatus?: string;
  shopTypeId?: string;
  provinceId?: string;
}

export interface FilterCounter extends Pagination {
  businessId?: string;
  shopId?: string;
  query?: string;
}

export interface FilterCustomerFeedback extends Pagination {
  type?: string;
  fromDate?: string | null;
  toDate?: string | null;
}

export interface Pageable<T> extends Pagination {
  items: T[];
  total: number;
}

export type ReferralQuery =
  | "PAGE_NUMBER"
  | "LIMIT"
  | "BRANCH_ID"
  | "QUERY"
  | "START_DATE"
  | "END_DATE";

export type SearchQuery =
  | "PAGE_NUMBER"
  | "LIMIT"
  | "QUERY"
  | "STATUS"
  | "MERCHANT_TYPE"
  | "CATEGORY_ID";

export interface ShopType {
  id: string;
  name: string;
  code: string;
  KhmerName: string;
}

export interface Reviewer {
  login: string;
  staffId: string;
  fullName: string;
  position: string;
  email: string;
  phoneNumber: string;
}

export interface ReviewBizResponse {
  note: string;
  id: string;
  toStatus: STATUS_LABEL;
  fromStatus: STATUS_LABEL;
  business: Business;
  reviewer: Reviewer;
}

export interface ReviewBizRequest {
  note: string;
  status: STATUS_LABEL;
}

export enum NameType {
  officialName = "OFFICIAL_NAME",
}

export enum MerchantType {
  corporate = "CORPORATE",
}

export interface Shop {
  no?: string;
  name: string;
  status: STATUS_LABEL;
  addressLine1?: string;
  profileImageUrl?: string;
  enabledTip: boolean;
  enabled?: boolean;
  latitude?: number;
  longitude?: number;
  telegramBot?: string;
  phoneNumber?: string;
  type?: ShopType;
}

export interface ShopProps extends Shop {
  id: string;
  counters?: CounterProps[];
  bankAccounts?: BankAccountNumberProps[];
  village?: LocationProps;
  province?: LocationProps;
  district?: LocationProps;
  commune?: LocationProps;
  counterCount?: number;
  createdDate: string;
}

export interface RequestShopProps extends Shop {
  villageId?: string;
  shopTypeId?: string;
  phoneNumber?: string;
  status: STATUS_LABEL;
  bankAccountNumbers: string[];
}

export interface TableHeaderProps {
  id: string;
  label: string;
  align?: string;
  icon?: React.JSXElementConstructor<{ className: string }>;
}

export enum Currency {
  usd = "USD",
  khr = "KHR",
}

export enum BankAccountStatus {
  unlocked = "UNLOCKED",
}

export interface CounterProps {
  id?: string;
  name: string | null;
  enabled?: boolean;
  createdDate?: string;
}

export interface Location {
  id: string;
  name: string;
  khmerName: string;
}

export interface MaterialTypeProps {
  name: string;
  imageUrl: string;
  enabled: boolean;
  id: string;
}

export interface LocationProps extends Location {
  code: string;
}

export interface BankAccountNumberProps {
  id: string;
  bankAccountNumber: string;
  bankAccountHolderName: string;
  currency: Currency;
  status: BankAccountStatus;
}

export interface StaffProps {
  id: number;
  shop: number;
  counter: number;
  label: string;
}

export interface StaffsProps {
  name: string;
  phoneNumber: string;
  shop: number;
  counter: number;
  staffs: StaffProps[];
}

export type NavItemTypeObject = {
  children?: NavItemType[];
  items?: NavItemType[];
  subMenu?: NavItemType[];
  type?: string;
};

export interface RoleProps {
  no: number;
  roleName: string;
  users: number;
  permission: string;
}

export interface TabsProps {
  children?: React.ReactNode;
  value: string | number;
  index: number;
}

export interface CustomShadowProps {
  z1: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  primary: string;
  secondary: string;
  orange: string;
  success: string;
  warning: string;
  error: string;
}

export interface ShopTypes {
  id: string;
  name: string;
  code: string;
  khmerName: string;
}

export interface BusinessCategories {
  id: string;
  name: string;
  shopTypes: ShopTypes[];
}

export interface AuditView {
  id?: string;
  field: string;
  oldValue: string;
  newValue: string;
  action: string;
  platform: string;
  entityType: string;
  modifiedOn: string;
  modifiedBy: string;
}

export interface AuditFilterRequest extends Pagination {
  businessId?: string;
  shopId?: string;
  counterId?: string;
  entityId?: string;
  entityType?: string;
  field?: string | null;
  fromDate?: string | null;
  toDate?: string | null;
  action?: string;
  platform?: string;
  searchText?: string | null;
}

interface materialListProps {
  requestAmount: number;
  materialTypeId: string;
}

export interface MaterialRequestVariables {
  receivingOption:
    | MATERIAL_REQUEST_RECEIVING_METHOD.DELIVERY
    | MATERIAL_REQUEST_RECEIVING_METHOD.PICK_UP;
  deliveryAddress?: string;
  status: MATERIAL_REQUEST_STATUS;
  latitude: number;
  longitude: number;
  businessId: string;
  shopId: string;
  counterIds: string[];
  pickupBranchId?: string;
  materialList: materialListProps[];
}

export interface MaterialRequestListVariables extends Pagination {
  status?: string;
}

interface MaterialRequestsCounter extends Omit<CounterProps, "id"> {
  id: string;
}

interface MaterialRequestsDataProps {
  counter: MaterialRequestsCounter;
  materialType: MaterialTypeProps;
  requestAmount: number;
}

export interface MaterialRequestProps extends MaterialRequestVariables {
  id: string;
  platform: string;
  customer: Customer;
  business: BusinessProps;
  shop: ShopProps;
  materialRequests: MaterialRequestsDataProps[];
  pickupBranch: BranchProps;
  createdDate: string;
}

export interface MaterialRequestsProps extends Pagination {
  items: MaterialRequestProps[];
  total: number;
  hasMore: boolean;
}

export interface AnnouncementVariables {
  title: string;
  khmerTitle: string;
  content: string;
  khmerContent: string;
  link?: string;
  imageUrl?: string;
  khmerImageUrl?: string;
}

export interface AnnouncementListVariables extends Pagination {
  status?: string;
}

export interface AnnouncementItemProps extends AnnouncementVariables {
  id: string;
  status: STATUS_LABEL.Draft | STATUS_LABEL.Published;
  createdDate: string;
}

export interface AnnouncementsProps extends Pagination {
  items: AnnouncementItemProps[];
  total: number;
  hasMore: boolean;
}

export interface MerchantAndAccountStatus {
  regionalName: string;
  branchName: string;
  totalShop: number;
  totalAccount: number;
  totalActiveShop: number;
  totalInactiveShop: number;
}

export interface MerchantPaymentSummary {
  regionalName: string;
  branchName: string;
  totalBusiness: number;
  totalShop: number;
  totalAccount: number;
  totalUsdAmount: number;
  totalKhrAmount: number;
}

export interface MerchantCategoryReport {
  regionalName: string;
  totalBranch: number;
  totalShop: number;
  totalAccount: number;
  totalCorporate: number;
  totalRetailer: number;
}

export interface MerchantReferral {
  regionalName: string;
  branchName: string;
  totalShop: number;
  totalAccount: number;
}

export interface ReportFilterRequest extends Pagination {
  regionalId?: string | null;
  branchId?: string | null;
  fromDate?: string | null;
  toDate?: string | null;
}
