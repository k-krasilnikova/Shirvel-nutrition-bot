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
  const today = moment().format("DD/MM/YYYY");
  const users = await Report.find({ date: today }).map(
    (report) => report.chatId
  );
  console.log(today, users);
  return users;
};
