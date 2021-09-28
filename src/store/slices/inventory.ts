import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: null,
  items: Array<string[]>(),
  reload: false,
  error: null,
  status: "idle",
  errorMsg: "",
};

export const fetchInventory = createAsyncThunk(
  "auth/fetchInventory",
  async (items: any) => {
    console.log(items);
    try {
      const res = axios.post("http://127.0.0.1:5000/api/v1/items", items);
      const item = (await res).data;
      return item;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  }
);

export const fetchInventoryItems = createAsyncThunk(
  "auth/fetchInventoryItems",
  async () => {
    try {
      const res = axios.get("http://127.0.0.1:5000/api/v1/items");
      const item = (await res).data;
      return item;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchInventoryCategories = createAsyncThunk(
  "auth/fetchInventoryCategories",
  async () => {
    try {
      const res = axios.get("http://127.0.0.1:5000/api/v1/categories");

      const categories = (await res).data;
      return categories;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateInventoryItem = createAsyncThunk(
  "auth/updateInventoryItem",
  async (items: any) => {
    try {
      const res = axios.put(`http://127.0.0.1:5000/api/v1/items/${items.id}`, {
        name: items.name,
        quantity: items.quantity,
        category_id: items.category_id,
        detail: items.detail,
      });

      const item = (await res).data;
      return item;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const patchInventoryItem = createAsyncThunk(
  "auth/patchInventoryItem",
  async (items: any) => {
    try {
      const res = axios.patch(
        `http://127.0.0.1:5000/api/v1/items/${items.id}`,
        {
          quantity: items.quantity,
        }
      );

      const item = (await res).data;
      return item;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteInventoryItem = createAsyncThunk(
  "auth/deleteInventoryItem",
  async (id: any) => {
    try {
      const res = axios.delete(`http://127.0.0.1:5000/api/v1/items/${id}`);
      const item = (await res).data;
      return item;
    } catch (error) {
      return error.response.data;
    }
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    clearReload(state) {
      state.reload = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchInventory.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        if (action.payload.reason) {
          state.errorMsg = action.payload.reason;
        } else {
          state.items.push(action.payload);
        }
      }
    );
    builder.addCase(fetchInventory.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchInventory.rejected, (state) => {
      state.status = "reject";
    });
    builder.addCase(
      fetchInventoryItems.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.items = action.payload;
      }
    );

    builder.addCase(fetchInventoryItems.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchInventoryItems.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      updateInventoryItem.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.reload = action.payload;
      }
    );

    builder.addCase(updateInventoryItem.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateInventoryItem.rejected, (state) => {
      state.status = "reject";
    });
    builder.addCase(
      patchInventoryItem.fulfilled,
      (state, action: { payload: any }) => {
        console.log(action.payload);
        state.status = "success";
        state.reload = action.payload;
      }
    );

    builder.addCase(patchInventoryItem.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(patchInventoryItem.rejected, (state) => {
      state.status = "reject";
    });
    builder.addCase(
      fetchInventoryCategories.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.categories = action.payload;
      }
    );

    builder.addCase(fetchInventoryCategories.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchInventoryCategories.rejected, (state) => {
      state.status = "reject";
    });

    builder.addCase(
      deleteInventoryItem.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.reload = action.payload;
      }
    );
    builder.addCase(deleteInventoryItem.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteInventoryItem.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const inventoryAction = inventorySlice.actions;
export default inventorySlice;
