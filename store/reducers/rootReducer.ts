// rootReducer.ts or rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import persistedAuthReducer from "@/store/slices/authSlice";
import persistedClientReducer from "@/store/slices/clientSlice";
import persistedTemplateReducer from "@/store/slices/templateSlice";
import persistedAppointmentReducer from "@/store/slices/appointmentSlice";
import persistedClinicianReducer from "@/store/slices/availabilityScheduleSlice";
import persistedNoteTemplateReducer from "@/store/slices/noteTemplateSlice";
import persistedMeetingReducer from "@/store/slices/meetingSlice";


const appReducer = combineReducers({
  auth: persistedAuthReducer,
  client: persistedClientReducer,
  template: persistedTemplateReducer,
  appointment: persistedAppointmentReducer,
  clinician: persistedClinicianReducer, 
  selectedNoteTemplate: persistedNoteTemplateReducer,
  meeting: persistedMeetingReducer,
  // add more reducers here
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_STORE") {
    state = undefined; // This will reset all slices to their initial state
  }
  return appReducer(state, action);
};

export default rootReducer;
