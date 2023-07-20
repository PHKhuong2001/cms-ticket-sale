import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  Query,
  where,
  query,
  DocumentData,
  Timestamp,
  setDoc,
  doc,
  limit,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import moment from "moment";
import {
  collectionNamePackages,
  collectionNameTickets,
  dataList,
  dataPackageList,
  getByNumberTicket,
  getDataPackage,
} from "~/config";
import database from "~/config/firebaseConfig";
import { FormCreate } from "~/shared/components/Modal/TicketPackageModal/AddPackage";
import {
  changeDate,
  changeTime,
  convertMoneyToVND,
  convertToTimestamp,
  generateCustomId,
} from "~/shared/helpers";
import { DataCheck, DataManageMent, DataPackage } from "~/shared/interfaces";

export interface DataState {
  data: DataManageMent[] | DataCheck[];
  dataPackage: DataPackage[];
  ticketUpdate: DataManageMent;
  packageUpdate: DataPackage;
}

const initialState: DataState = {
  data: dataList,
  dataPackage: dataPackageList,
  ticketUpdate: getByNumberTicket,
  packageUpdate: getDataPackage,
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
      ngaySuDung: changeDate(doc.data().dateUse.seconds),
      ngayXuatVe: changeDate(doc.data().dateRelease.seconds),
      congCheckIn: doc.data().gate,
      actions: {
        text: doc.data().status,
        ticketNumber: doc.data().ticketNumber,
      },
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
      ngaySuDung: changeDate(doc.data().dateUse.seconds),
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

    if (packageName) {
      queryApi = query(queryApi, where("package", "==", packageName));
    }

    if (status && status.length > 0) {
      queryApi = query(queryApi, where("status", "in", status));
    }

    if (gates && gates.length > 0) {
      queryApi = query(queryApi, where("gate", "in", gates));
    }

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

    const response = await getDocs(queryApi);
    const data = response.docs.map<DataManageMent>((doc, index) => {
      if (doc.data().nameEvent) {
        return {
          key: `${index + 1}`,
          stt: index + 1,
          bookingCode: doc.id,
          soVe: doc.data().ticketNumber,
          tenSuKien: doc.data().nameEvent,
          trangThai: doc.data().status,
          ngaySuDung: changeDate(doc.data().dateUse.seconds),
          hanSudung: changeDate(doc.data().dateExpiration.seconds),
          congCheckIn: doc.data().gate,
          actions: {
            text: `${doc.data().status} ${
              doc.data()?.nameEvent ? "event" : ""
            }`,
            ticketNumber: doc.data().ticketNumber,
          },
        };
      }
      return {
        key: `${index + 1}`,
        stt: index + 1,
        bookingCode: doc.id,
        soVe: doc.data().ticketNumber,
        tenSuKien: doc.data().nameEvent,
        trangThai: doc.data().status,
        ngaySuDung: changeDate(doc.data().dateUse.seconds),
        ngayXuatVe: changeDate(doc.data().dateRelease.seconds),
        congCheckIn: doc.data().gate,
        actions: {
          text: `${doc.data().status} ${doc.data()?.nameEvent ? "event" : ""}`,
          ticketNumber: doc.data().ticketNumber,
        },
      };
    });
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
      ngaySuDung: changeDate(doc.data().dateUse.seconds),
      congCheckIn: doc.data().gate,
      doiSoat: doc.data().check,
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
    const data = response.docs.map<DataPackage>((doc, index) => {
      return {
        key: `${index + 1}`,
        stt: index + 1,
        maGoi: doc.id,
        tenGoiVe: doc.data().package,
        ngayApDung: doc.data().dateApplicable.seconds,
        ngayHetHan: doc.data().dateExpiration.seconds,
        giaVe: convertMoneyToVND(doc.data().fare),
        combo: doc.data().comboPrice
          ? `${convertMoneyToVND(doc.data().comboPrice)}/${
              doc.data().comboTickets
            } Vé`
          : "-",
        tinhTrang: doc.data().status,
        actions: doc.id,
      };
    });
    return data;
  }
);

export const addPackageFireBase = createAsyncThunk(
  "tickets/addPackageFireBase",
  async (packageObject: FormCreate) => {
    const newApplicable = packageObject.dateApplicable;
    const newExpiration = packageObject.dateExpiration;

    const customId = generateCustomId();
    await setDoc(doc(collection(database, collectionNamePackages), customId), {
      ...packageObject,
      dateApplicable: convertToTimestamp(newApplicable),
      dateExpiration: convertToTimestamp(newExpiration),
    });
  }
);

export const getTicketByNumber = createAsyncThunk(
  "tickets/getTicketByNumber",
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

    if (ticketNumber) {
      queryApi = query(queryApi, where("ticketNumber", "==", ticketNumber));
    }

    if (packageName) {
      queryApi = query(queryApi, where("package", "==", packageName));
    }

    const querySnapshot = await getDocs(query(queryApi, limit(1)));

    const doc = querySnapshot.docs[0];
    const data = {
      key: `${0}`,
      stt: 0,
      bookingCode: doc.id,
      soVe: doc.data().ticketNumber,
      tenSuKien: doc.data().nameEvent,
      trangThai: doc.data().status,
      ngaySuDung: changeDate(doc.data().dateUse.seconds),
      ngayXuatVe: changeDate(doc.data().dateRelease.seconds),
      hanSudung: changeDate(doc.data().dateExpiration.seconds),
      congCheckIn: doc.data().gate,
      actions: {
        text: doc.data().status,
        ticketNumber: doc.data().ticketNumber,
      },
    };
    return data;
  }
);

export const getPackageById = createAsyncThunk(
  "tickets/getPackageById",
  async (ticketId: string) => {
    const docRef = doc(collection(database, collectionNamePackages), ticketId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const result = {
        key: `${0}`,
        stt: 0,
        maGoi: docSnapshot.id,
        tenGoiVe: data.package,
        ngayApDung: `${changeDate(data.dateApplicable.seconds)} ${changeTime(
          data.dateApplicable.seconds
        )}`,
        ngayHetHan: data.dateExpiration.seconds,
        giaVe: convertMoneyToVND(data.fare),
        combo: data.comboPrice
          ? `${convertMoneyToVND(data.comboPrice)}/${data.comboTickets} Vé`
          : "-",
        tinhTrang: data.status,
        actions: data.id,
      };
      return result;
    } else {
      throw new Error("Ticket not found");
    }
  }
);

export const updateDateByTicketNumber = createAsyncThunk(
  "tickets/updateDateApplicableByTicketNumber",
  async ({
    ticketNumber,
    newExpiration,
  }: {
    ticketNumber: string;
    newExpiration: string;
  }) => {
    const querySnapshot = await getDocs(
      collection(database, collectionNameTickets)
    );
    const packageDoc = querySnapshot.docs.find(
      (doc) => doc.data().ticketNumber === ticketNumber
    );

    if (packageDoc) {
      await updateDoc(packageDoc.ref, {
        dateExpiration: convertToTimestamp(newExpiration),
      });
    } else {
      throw new Error("Gói vé không tồn tại");
    }
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
      })
      .addCase(addPackageFireBase.fulfilled, (state) => {
        const newDataPackage = state.dataPackage.map((item) => {
          return item;
        });

        state.dataPackage = newDataPackage;
        console.log(state.dataPackage);
      })
      .addCase(addPackageFireBase.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(getTicketByNumber.fulfilled, (state, action) => {
        console.log(action.payload);

        state.ticketUpdate = { ...action.payload };
      })
      .addCase(updateDateByTicketNumber.fulfilled, (state, action) => {
        state.ticketUpdate = {
          key: ``,
          stt: 0,
          bookingCode: "",
          soVe: "",
          tenSuKien: "",
          trangThai: "",
          ngaySuDung: "",
          ngayXuatVe: "",
          congCheckIn: "",
          actions: {
            text: "",
            ticketNumber: "",
          },
        };
      });
  },
});

export default ticketSlice.reducer;
