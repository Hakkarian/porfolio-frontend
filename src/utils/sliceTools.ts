export const pending = (state: any) => {
    state.isLoading = true
}

export const rejected = (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload as string | null;
}