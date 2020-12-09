import moment from "moment";

import Report from "../models/report.js";

export const createReport = async (props) => {
  let report = await getReportByDate(props.date);
  if (report) {
    report = await Report.updateOne({ date: props.date }, { ...props });
  } else {
    report = await Report.create({
      ...props,
      reaction: null,
    });
  }
  return report;
};

export const getReportByDate = async (date) => {
  const report = await Report.findOne({
    date,
  });
  return report;
};

export const getUsersWithReport = async () => {
  const yesterday = moment().subtract(1, "days").format("DD/MM/YYYY");
  const users = await Report.find({ date: yesterday })?.map(
    (report) => report.chatId
  );
  const a = await Report.find({ date: yesterday });
  console.log(yesterday, a, users);
  return users || [];
};
