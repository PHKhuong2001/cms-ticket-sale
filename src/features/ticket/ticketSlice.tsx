import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  Query,
  where,
  query,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import moment from "moment";
import {
  collectionNamePackages,
  collectionNameTickets,
  dataList,
  dataPackageList,
  filtersDataCheckObject,
} from "~/config";
import database from "~/config/firebaseConfig";
import { changeTime } from "~/shared/helpers";
import { DataCheck, DataManageMent, DataPackage } from "~/shared/interfaces";

export interface DataManagementState {
  data: DataManageMent[] | DataCheck[];
  dataPackage: DataPackage[];
}

const initialState: DataManagementState = {
  data: dataList,
  dataPackage: dataPackageList,
};

export const searchPackageManage = createAsyncThunk(
  "ticket/searchPackageManage",
  async ({
    packageName,
    ticketNumber,
  }: {
    packageName: string;
    ticketNumber: string;
  }) => {
    let queryApi: Query<DocumentData> = collection(
      database,
      collectionNameTickets
    );
    if (packageName) {
      queryApi = query(queryApi, where("package", "==", packageName));
    }
    if (ticketNumber) {
      queryApi = query(queryApi, where("ticketNumber", "==", ticketNumber));
    }
    const response = await getDocs(queryApi);
    const data = response.docs.map<DataManageMent>((doc, index) => ({
      key: `${index + 1}`,
      stt: index + 1,
      bookingCode: doc.id,
      soVe: doc.data().ticketNumber,
      tenSuKien: doc.data().nameEvent,
      trangThai: doc.data().status,
      ngaySuDung: changeTime(doc.data().dateUse.seconds),
      ngayXuatVe: changeTime(doc.data().dateRelease.seconds),
      congCheckIn: doc.data().gate,
      actions: ":",
    }));
    return data;
  }
);

export const getAllPackage = createAsyncThunk(
  "ticket/getAllPackage",
  async (_) => {
    const response = await getDocs(
      collection(database, collectionNamePackages)
    );
    const options = { style: "currency", currency: "VND" };
    const data = response.docs.map<DataPackage>((doc, index) => ({
      key: `${index + 1}`,
      stt: index + 1,
      maGoi: "string",
      tenGoiVe: doc.data().package,
      ngayApDung: changeTime(doc.data().dateApplicable.seconds),
      ngayHetHan: changeTime(doc.data().dateExpiration.seconds),
      giaVe: parseInt(doc.data().fare)
        .toLocaleString("vi-VN", options)
        .replace("₫", "VNĐ"),
      combo: doc.data().comboPrice
        ? `${parseInt(doc.data().comboPrice)
            .toLocaleString("vi-VN", options)
            .replace("₫", "VNĐ")}/${doc.data().comboTickets} Vé`
        : "-",
      tinhTrang: doc.data().status,
      actions: "String",
    }));
    return data;
  }
);

export const searchPackageCheck = createAsyncThunk(
  "ticket/searchPackageCheck",
  async ({
    packageName,
    ticketNumber,
  }: {
    packageName: string;
    ticketNumber: string;
  }) => {
    let queryApi: Query<DocumentData> = collection(
      database,
      collectionNameTickets
    );
    if (packageName) {
      queryApi = query(queryApi, where("package", "==", packageName));
    }
    if (ticketNumber) {
      queryApi = query(queryApi, where("ticketNumber", "==", ticketNumber));
    }
    const response = await getDocs(queryApi);
    const data = response.docs.map<DataCheck>((doc, index) => ({
      key: `${index + 1}`,
      stt: index + 1,
      soVe: doc.data().ticketNumber,
      tenSuKien: doc.data().nameEvent,
      loaiVe: doc.data().typeTicket,
      ngaySuDung: changeTime(doc.data().dateUse.seconds),
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
      console.log("Time True");

      const startTimestamp = Timestamp.fromMillis(
        moment(startDate, "DD/MM/YYYY").startOf("day").valueOf()
      );
      const endTimestamp = Timestamp.fromMillis(
        moment(endDate, "DD/MM/YYYY").endOf("day").valueOf()
      );

      queryApi = query(
        queryApi,
        where("dateRelease", ">=", startTimestamp),
        where("dateRelease", "<=", endTimestamp)
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
      ngaySuDung: changeTime(doc.data().dateUse.seconds),
      ngayXuatVe: changeTime(doc.data().dateRelease.seconds),
      congCheckIn: doc.data().gate,
      actions: doc.data().status,
    }));
    return data;
  }
);
export const filterPackageCheck = createAsyncThunk(
  "ticket/filterPackageCheck",
  async ({
    packageName,
    startDate,
    endDate,
    statusCheck,
    gates,
  }: {
    packageName: string;
    startDate?: string;
    endDate?: string;
    statusCheck?: string[];
    gates?: string[];
  }) => {
    let queryApi: Query<DocumentData> = collection(
      database,
      collectionNameTickets
    );

    if (startDate && endDate) {
      console.log("Time True");

      const startTimestamp = Timestamp.fromMillis(
        moment(startDate, "DD/MM/YYYY").startOf("day").valueOf()
      );
      const endTimestamp = Timestamp.fromMillis(
        moment(endDate, "DD/MM/YYYY").endOf("day").valueOf()
      );

      queryApi = query(
        queryApi,
        where("dateUse", ">=", startTimestamp),
        where("dateUse", "<=", endTimestamp)
      );
    }

    if (packageName) {
      queryApi = query(queryApi, where("package", "==", packageName));
    }

    if (statusCheck && statusCheck.length > 0) {
      queryApi = query(queryApi, where("check", "in", statusCheck));
    }

    // if (gates && gates.length > 0) {
    //   queryApi = query(queryApi, where("gate", "in", gates));
    // }

    const response = await getDocs(queryApi);
    const data = response.docs.map<DataCheck>((doc, index) => ({
      key: `${index + 1}`,
      stt: index + 1,
      soVe: doc.data().ticketNumber,
      tenSuKien: doc.data().nameEvent,
      loaiVe: doc.data().typeTicket,
      ngaySuDung: changeTime(doc.data().dateUse.seconds),
      congCheckIn: doc.data().gate,
      doiSoat: doc.data().check,
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
      .addCase(getAllPackage.fulfilled, (state, action) => {
        state.dataPackage = [...action.payload];
      })
      .addCase(searchPackageManage.fulfilled, (state, action) => {
        state.data = [...action.payload];
      })
      .addCase(filterPackage.fulfilled, (state, action) => {
        state.data = [...action.payload];
      })
      .addCase(filterPackageCheck.fulfilled, (state, action) => {
        state.data = [...action.payload];
      })
      .addCase(searchPackageCheck.fulfilled, (state, action) => {
        state.data = [...action.payload];
      });
  },
});

export default ticketSlice.reducer;
