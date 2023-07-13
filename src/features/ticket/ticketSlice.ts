import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  Query,
  where,
  query,
  DocumentData,
} from "firebase/firestore";
import moment from "moment";

import { collectionNameTickets } from "~/config";
import database from "~/config/firebaseConfig";
import { DataCheck, DataManageMent } from "~/shared/interfaces";

export interface DataManagementState {
  data: DataManageMent[] | DataCheck[];
}

export const dataManage: DataManageMent[] = [];
const initialState: DataManagementState = {
  data: dataManage,
};

export const getAllPackageManage = createAsyncThunk(
  "ticket/getAllPackageManage",
  async (packageName: string) => {
    const queryApi = query(
      collection(database, collectionNameTickets),
      where("package", "==", packageName)
    );

    const response = await getDocs(queryApi);
    const data = response.docs.map<DataManageMent>((doc, index) => ({
      key: `${index + 1}`,
      stt: index + 1,
      bookingCode: doc.id,
      soVe: doc.data().ticketNumber,
      tenSuKien: doc.data().nameEvent,
      trangThai: doc.data().status,
      ngaySuDung: doc.data().dateUse,
      ngayXuatVe: doc.data().dateRelease,
      congCheckIn: doc.data().gate,
      actions: "",
    }));
    console.log(data);

    return data;
  }
);

export const getAllPackageCheck = createAsyncThunk(
  "ticket/getAllPackageCheck",
  async (packageName: string) => {
    const queryApi = query(
      collection(database, collectionNameTickets),
      where("package", "==", packageName)
    );

    const response = await getDocs(queryApi);
    const data = response.docs.map<DataCheck>((doc, index) => ({
      key: `${index + 1}`,
      stt: index + 1,
      soVe: doc.data().ticketNumber,
      tenSuKien: doc.data().nameEvent,
      ngaySuDung: doc.data().dateUse,
      loaiVe: doc.data().typeTicket,
      congCheckIn: doc.data().gate,
      doiSoat: doc.data().check,
    }));
    return data;
  }
);

export const filterPackage = createAsyncThunk(
  "ticket/filterPackage",
  async ({
    packageName,
    startDate,
    endDate,
    status,
    gates,
  }: {
    packageName: string;
    startDate?: string;
    endDate?: string;
    status?: string[];
    gates?: string[];
  }) => {
    let queryApi: Query<DocumentData> = collection(
      database,
      collectionNameTickets
    );

    if (startDate && endDate) {
      queryApi = query(
        queryApi,
        where("dateRelease", ">=", startDate),
        where("dateRelease", "<=", endDate)
      );
    }

    if (packageName) {
      queryApi = query(queryApi, where("package", "==", packageName));
    }

    if (status && status.length > 0) {
      queryApi = query(queryApi, where("status", "in", status));
    }

    if (gates && gates.length > 0) {
      queryApi = query(queryApi, where("gate", "in", gates));
    }

    const response = await getDocs(queryApi);
    const data = response.docs.map<DataManageMent>((doc, index) => ({
      key: `${index + 1}`,
      stt: index + 1,
      bookingCode: doc.id,
      soVe: doc.data().ticketNumber,
      tenSuKien: doc.data().nameEvent,
      trangThai: doc.data().status,
      ngaySuDung: doc.data().dateUse,
      ngayXuatVe: doc.data().dateRelease,
      congCheckIn: doc.data().gate,
      actions: "",
    }));
    return data;
  }
);
const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getAllPackageManage.fulfilled, (state, action) => {
        state.data = [...action.payload];
      })
      .addCase(getAllPackageCheck.fulfilled, (state, action) => {
        state.data = [...action.payload];
      })
      .addCase(filterPackage.fulfilled, (state, action) => {
        state.data = [...action.payload];
      });
  },
});

export default ticketSlice.reducer;
