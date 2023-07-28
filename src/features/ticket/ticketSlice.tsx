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
  getStartAndEndOfWeekInMonth,
  getWeekDates,
  splitDate,
  splitDateFare,
} from "~/shared/helpers";
import {
  ChartType,
  DataCheck,
  DataManageMent,
  DataPackage,
} from "~/shared/interfaces";

export interface DataState {
  data: DataManageMent[] | DataCheck[];
  dataPackage: DataPackage[];
  ticketUpdate: DataManageMent;
  packageUpdate: DataPackage;
  dataPackageFamily: string[];
  dataPackageEvenet: string[];
  dataChart: ChartType[];
}

const initialState: DataState = {
  data: dataList,
  dataPackage: dataPackageList,
  ticketUpdate: getByNumberTicket,
  packageUpdate: getDataPackage,
  dataPackageFamily: [],
  dataPackageEvenet: [],
  dataChart: [],
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

    if (gates && gates.length > 0) {
      queryApi = query(queryApi, where("gate", "in", gates));
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

export const updatePackageFireBase = createAsyncThunk(
  "tickets/updatePackageFireBase",
  async (packageObject: DataPackage) => {
    const querySnapshot = await getDocs(
      collection(database, collectionNamePackages)
    );
    const packageDoc = querySnapshot.docs.find(
      (doc) => doc.id === packageObject.maGoi
    );

    if (packageDoc) {
      await updateDoc(packageDoc.ref, {
        comboPrice: packageObject.combo,
        comboTickets: packageObject.key,
        dateApplicable: convertToTimestamp(packageObject.ngayApDung),
        dateExpiration: convertToTimestamp(packageObject.ngayHetHan),
        fare: packageObject.giaVe,
        nameEvent: packageObject.tenSuKien,
        status: packageObject.tinhTrang,
      });
    } else {
      throw new Error("Gói vé không tồn tại");
    }

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
export const getTicketByNumber = createAsyncThunk(
  "tickets/getTicketByNumber",
  async ({
    // packageName,
    ticketNumber,
  }: {
    // packageName: string;
    ticketNumber: string;
  }) => {
    let queryApi: Query<DocumentData> = collection(
      database,
      collectionNameTickets
    );

    if (ticketNumber) {
      queryApi = query(queryApi, where("ticketNumber", "==", ticketNumber));
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
      hanSudung: changeDate(doc.data().dateExpiration?.seconds),
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
        key: `${data.comboTickets}`,
        stt: 0,
        maGoi: docSnapshot.id,
        tenGoiVe: data.package,
        tenSuKien: data.nameEvent,
        ngayApDung: `${changeDate(data.dateApplicable.seconds)} ${changeTime(
          data.dateApplicable.seconds
        )}`,
        ngayHetHan: `${changeDate(data.dateExpiration.seconds)} ${changeTime(
          data.dateExpiration.seconds
        )}`,
        giaVe: data.fare,
        combo: `${data.comboPrice}`,
        tinhTrang: data.status,
        actions: data.id,
      };
      return result;
    } else {
      throw new Error("Ticket not found");
    }
  }
);

export const getAllTicketsByPackageNameAndMonth = createAsyncThunk(
  "tickets/getAllTicketsByPackageNameAndMonth",
  async ({
    packageName,
    dateString,
  }: {
    packageName: string;
    dateString: string;
  }) => {
    // Chuyển đổi chuỗi thành giá trị ngày, tháng và năm
    const { month, year } = splitDate(dateString);

    // Tạo timestamp từ ngày, tháng và năm
    const startDate = Timestamp.fromDate(new Date(year, month - 1, 1));
    const endDate = Timestamp.fromDate(new Date(year, month, 0));

    // Query theo trường "package" và trường timestamp
    const querySnapshot = await getDocs(
      query(
        collection(database, collectionNameTickets),
        where("package", "==", packageName),
        where("dateUse", ">=", startDate),
        where("dateUse", "<=", endDate)
      )
    );

    const allTickets = querySnapshot.docs.map((doc) => doc.data().status);
    return allTickets;
  }
);
export const getAllTicketsByPackageNameEvent = createAsyncThunk(
  "tickets/getAllTicketsByPackageNameEvent",
  async ({
    packageName,
    dateString,
  }: {
    packageName: string;
    dateString: string;
  }) => {
    // Chuyển đổi chuỗi thành giá trị ngày, tháng và năm
    const { month, year } = splitDate(dateString);

    // Tạo timestamp từ ngày, tháng và năm
    const startDate = Timestamp.fromDate(new Date(year, month - 1, 1));
    const endDate = Timestamp.fromDate(new Date(year, month, 0));

    // Query theo trường "package" và trường timestamp
    const querySnapshot = await getDocs(
      query(
        collection(database, collectionNameTickets),
        where("package", "==", packageName),
        where("dateUse", ">=", startDate),
        where("dateUse", "<=", endDate)
      )
    );

    const allTickets = querySnapshot.docs.map((doc) => doc.data().status);
    return allTickets;
  }
);

export const updateDateExpirationByTicketNumber = createAsyncThunk(
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

export const updateDateUseByTicketNumber = createAsyncThunk(
  "tickets/updateDateUseByTicketNumber",
  async ({
    ticketNumber,
    newUse,
  }: {
    ticketNumber: string;
    newUse: string;
  }) => {
    const querySnapshot = await getDocs(
      collection(database, collectionNameTickets)
    );
    const packageDoc = querySnapshot.docs.find(
      (doc) => doc.data().ticketNumber === ticketNumber
    );

    if (packageDoc) {
      await updateDoc(packageDoc.ref, {
        dateUse: convertToTimestamp(newUse),
      });
    } else {
      throw new Error("Gói vé không tồn tại");
    }
  }
);

export const updateStatusToSettled = createAsyncThunk(
  "tickets/updateStatusToSettled",
  async ({
    ticketNumbers,
    dataList,
  }: {
    ticketNumbers: string[];
    dataList: DataManageMent[] | DataCheck[];
  }) => {
    let queryApi: Query<DocumentData> = collection(
      database,
      collectionNameTickets
    );

    if (ticketNumbers && ticketNumbers.length > 0) {
      // Nếu có danh sách ticketNumbers, thêm điều kiện where vào câu truy vấn
      queryApi = query(queryApi, where("ticketNumber", "in", ticketNumbers));
    }

    // Lấy dữ liệu dựa trên câu truy vấn
    const querySnapshot = await getDocs(queryApi);
    const ticketsToUpdate = querySnapshot.docs.map((doc: any) => {
      return { key: doc.id, ...doc.data() };
    }) as DataManageMent[];

    if (ticketsToUpdate.length > 0) {
      const updatePromises = ticketsToUpdate.map(
        async (ticket: DataManageMent) => {
          const ticketDocRef = doc(
            database,
            `${collectionNameTickets}/${ticket.key}`
          );
          await updateDoc(ticketDocRef, {
            check: "Đã đối soát",
          });
        }
      );

      await Promise.all(updatePromises);
    } else {
      throw new Error("Không tìm thấy vé để cập nhật");
    }
  }
);

export const getAllTotalFareChart = createAsyncThunk(
  "tickets/getAllTotalFareChart",
  async ({ dateString }: { dateString: string }) => {
    const { month, year } = splitDate(dateString);

    const weeksInMonth = getStartAndEndOfWeekInMonth(year, month);

    const allTickets: {
      weekNumber: number;
      startDate: string;
      endDate: string;
      fareMoney: number;
    }[] = [];
    for (let i = 0; i < weeksInMonth.length; i++) {
      const week = weeksInMonth[i];
      const querySnapshot = await getDocs(
        query(
          collection(database, collectionNameTickets),
          where("dateRelease", ">=", Timestamp.fromDate(week.start)),
          where("dateRelease", "<=", Timestamp.fromDate(week.end))
        )
      );

      const ticketsInWeek = querySnapshot.docs.map((doc) => {
        return {
          date: changeDate(doc.data().dateRelease.seconds),
          fareMoney: doc.data().fare,
        };
      });

      // Tính tổng tiền của tuần
      const totalFareMoney = ticketsInWeek.reduce(
        (sum, ticket) => sum + parseFloat(ticket.fareMoney),
        0
      );

      // Thêm vào danh sách
      allTickets.push({
        weekNumber: i + 1,
        startDate: changeDate(week.start.getTime() / 1000), // Thêm thông tin ngày đầu tuần
        endDate: changeDate(week.end.getTime() / 1000), // Thêm thông tin ngày cuối tuần
        fareMoney: totalFareMoney, // Giữ nguyên giá trị fareMoney đã tính tổng từ firebase
      });
    }

    return allTickets;
  }
);

export const getWeeklyData = createAsyncThunk(
  "tickets/getWeeklyData",
  async ({ dateString }: { dateString: string }) => {
    const { day, month, year } = splitDateFare(dateString);

    const weekDates = getWeekDates(year, month, day);

    const allTickets: ChartType[] = [];

    for (const date of weekDates) {
      const querySnapshot = await getDocs(
        query(
          collection(database, collectionNameTickets),
          where(
            "dateRelease",
            ">=",
            Timestamp.fromDate(moment(date, "DD/MM/YYYY").toDate())
          ),
          where(
            "dateRelease",
            "<",
            Timestamp.fromDate(
              moment(date, "DD/MM/YYYY").add(1, "days").toDate()
            )
          )
        )
      );

      const ticketsInDate = querySnapshot.docs.map((doc) => {
        return {
          dates: moment(doc.data().dateRelease.toDate()).format("DD/MM/YYYY"),
          fareMoney: parseFloat(doc.data().fare), // Parse fareMoney thành số (float)
        };
      });

      // Tính tổng tiền của ngày
      const totalFareMoney = ticketsInDate.reduce(
        (sum, ticket) => sum + ticket.fareMoney,
        0
      );

      // Thêm vào danh sách
      allTickets.push({ date, fareMoney: totalFareMoney });
    }

    return allTickets;
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
      .addCase(addPackageFireBase.fulfilled, (state, action) => {
        state.dataPackage = action.payload;
      })
      .addCase(addPackageFireBase.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(getTicketByNumber.fulfilled, (state, action) => {
        state.ticketUpdate = { ...action.payload };
      })
      .addCase(getTicketByNumber.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(
        getAllTicketsByPackageNameAndMonth.fulfilled,
        (state, action) => {
          state.dataPackageFamily = [...action.payload];
        }
      )
      .addCase(getAllTicketsByPackageNameEvent.fulfilled, (state, action) => {
        state.dataPackageEvenet = [...action.payload];
      })
      .addCase(
        updateDateExpirationByTicketNumber.fulfilled,
        (state, action) => {
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
        }
      )
      .addCase(updateDateUseByTicketNumber.fulfilled, (state, action) => {
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
      })
      .addCase(updatePackageFireBase.fulfilled, (state, action) => {
        state.packageUpdate = {
          key: "",
          stt: 0,
          maGoi: "",
          tenGoiVe: "",
          ngayApDung: "",
          ngayHetHan: "",
          giaVe: "",
          combo: "",
          tinhTrang: "",
          actions: "",
        };
        state.dataPackage = action.payload;
      })
      .addCase(getPackageById.fulfilled, (state, action) => {
        state.packageUpdate = { ...action.payload };
      })
      .addCase(getAllTotalFareChart.fulfilled, (state, action) => {
        state.dataChart = [...action.payload];
      })
      .addCase(getWeeklyData.fulfilled, (state, action) => {
        state.dataChart = [...action.payload];
      });
  },
});

export default ticketSlice.reducer;
