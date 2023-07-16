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
  collectionNameTickets,
  dataList,
  filtersDataCheckObject,
} from "~/config";
import database from "~/config/firebaseConfig";
import { changeTime } from "~/shared/helpers";
import {
  DataCheck,
  DataManageMent,
  FiltersDataCheckType,
} from "~/shared/interfaces";

export interface DataManagementState {
  data: DataManageMent[] | DataCheck[];
  filtersDataCheck: FiltersDataCheckType;
}

const initialState: DataManagementState = {
  data: dataList,
  filtersDataCheck: filtersDataCheckObject,
};

// export const getAllPackageManage = createAsyncThunk(
//   "ticket/getAllPackageManage",
//   async (packageName: string) => {
//     const queryApi = query(
//       collection(database, collectionNameTickets),
//       where("package", "==", packageName)
//     );

//     const response = await getDocs(queryApi);
//     const data = response.docs.map<DataManageMent>((doc, index) => ({
//       key: `${index + 1}`,
//       stt: index + 1,
//       bookingCode: doc.id,
//       soVe: doc.data().ticketNumber,
//       tenSuKien: doc.data().nameEvent,
//       trangThai: doc.data().status,
//       ngaySuDung: changeTime(doc.data().dateUse.seconds),
//       ngayXuatVe: changeTime(doc.data().dateRelease.seconds),
//       congCheckIn: doc.data().gate,
//       actions: ":",
//     }));
//     return data;
//   }
// );

export const searchPackageManage = createAsyncThunk(
  "ticket/searchPackageManage",
  async ({
    packageName,
    ticketNumber,
  }: {
    packageName: string;
    ticketNumber: string | null;
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

// export const getAllPackageCheck = createAsyncThunk(
//   "ticket/getAllPackageCheck",
//   async (packageName: string) => {
//     const queryApi = query(
//       collection(database, collectionNameTickets),
//       where("package", "==", packageName)
//     );

//     const response = await getDocs(queryApi);
//     const data = response.docs.map<DataCheck>((doc, index) => ({
//       key: `${index + 1}`,
//       stt: index + 1,
//       soVe: doc.data().ticketNumber,
//       tenSuKien: doc.data().nameEvent,
//       ngaySuDung: changeTime(doc.data().dateUse.seconds),
//       loaiVe: doc.data().typeTicket,
//       congCheckIn: doc.data().gate,
//       doiSoat: doc.data().check,
//     }));
//     console.log(data);

//     return data;
//   }
// );

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
      actions: ":",
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
      // .addCase(getAllPackageManage.fulfilled, (state, action) => {
      //   state.data = [...action.payload];
      // })
      // .addCase(getAllPackageCheck.fulfilled, (state, action) => {
      //   state.data = [...action.payload];
      // })
      .addCase(filterPackage.fulfilled, (state, action) => {
        state.data = [...action.payload];
      })
      .addCase(filterPackageCheck.fulfilled, (state, action) => {
        state.data = [...action.payload];
      });
  },
});

export default ticketSlice.reducer;
