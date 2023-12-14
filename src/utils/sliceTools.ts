// change the loading state to true
export const pending = (state: any) => {
  state.isLoading = true;
};

// turn the loading bar off and display an error
export const rejected = (state: any, action: any) => {
  state.isLoading = false;
  state.error = action.payload as string | null;
};
