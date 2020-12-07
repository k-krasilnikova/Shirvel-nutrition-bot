import Report from "../models/report";

export const createReport = async (props) => {
  const report = await Report.create({
    ...props,
    reaction: null,
  });
  return report;
};
