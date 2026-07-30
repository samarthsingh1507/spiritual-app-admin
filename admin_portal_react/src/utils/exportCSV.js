import Papa from "papaparse";

export function exportUsersCSV(users) {
  const csvData = users.map((user) => ({
    Name: user.name,
    Email: user.email,
    Plan: user.plan,
    Status: user.status,
  }));

  const csv = Papa.unparse(csvData);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "users.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}