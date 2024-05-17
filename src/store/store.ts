import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore } from 'redux-persist';
import rootReducer from './reducer'

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
});

const persister = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
interface SelectProps {
    value: string;
    label: string;
  }

export const options: SelectProps[] = [
    { value: "cooper123", label: "cooper123" },
    { value: "cooper234", label: "cooper123" },
    { value: "cooper345", label: "cooper123" },
  ];

export const allLabels = [
  { id: 1, value: "StaffId", label: "Staff ID"},
  { id: 2, value: "FullName", label: "Full Name"},
  { id: 3, value: "EmailAddress", label: "Email Address"},
  { id: 4, value: "RefferalNumber", label: "Referral Number"},
]

export const allPermissions = [
  { id: 1, value: "Dashboard", label: "Dashboard"},
  { id: 2, value: "Roles Management", label: "Roles Management"},
  { id: 3, value: "KB PRASAC Branch", label: "KB PRASAC Branch"},
  { id: 4, value: "Business Management", label: "Business Management"},
  { id: 5, value: "Shop Management", label: "Shop Management"},
  { id: 6, value: "Counter Management", label: "Counter Management"},
  { id: 7, value: "Customer Feedback", label: "Customer Feedback"},
  { id: 8, value: "Announcement", label: "Announcement"},
  { id: 9, value: "KHQR Material", label: "KHQR Material"},
  { id: 10, value: "KHQR Material Request", label: "KHQR Material Request"},
]

export const selectPermissions = [
  {id : 1, value: "View Only", lable: "View Only"},
  {id : 2, value: "Create", lable: "Create"},
  {id : 3, value: "Edit", lable: "Edit"},
  {id : 1, value: "Delete", lable: "Delete"},
  {id : 1, value: "Export", lable: "Export"},

]
const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, persister, dispatch, useSelector, useDispatch };
