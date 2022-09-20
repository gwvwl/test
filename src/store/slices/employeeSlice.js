import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getEmployee = async (offset) => {
  const request = await fetch(
    `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&offset=${offset}&count=6`
  );
  return await request.json();
};

export const getEmployeeList = createAsyncThunk(
  "employeeSlice/getEmployeeList",
  async (offset, { rejectWithValue, dispatch }) => {
    try {
      getEmployee(offset).then((res) => dispatch(ListEmployee(res.users)));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addEmployeeList = createAsyncThunk(
  "employeeSlice/addEmployeeList",
  async (offset, { rejectWithValue, dispatch }) => {
    try {
      getEmployee(offset).then((res) => dispatch(addEmployee(res.users)));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const signUp = createAsyncThunk(
  "employeeSlice/signUp",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const getToken = await fetch(
        "https://frontend-test-assignment-api.abz.agency/api/v1/token"
      );
      const { token } = await getToken.json();
      const requestOptions = {
        method: "POST",
        body: body,
        headers: { Token: token },
      };
      let request = await fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users`,
        { requestOptions }
      );
      let resultat = await request.json();
      console.log(resultat);
      dispatch(ListEmployee([]));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: [],
    offset: 0,
    status: null,
    error: null,
  },
  reducers: {
    ListEmployee(state, { payload }) {
      state.employee = [...payload];
    },
    addEmployee(state, action) {
      state.employee = [...state.employee, ...action.payload];
    },
  },
  extraReducers: {},
});

export const { ListEmployee, addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
