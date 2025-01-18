type state = "pending" | "approved" | "payed" | "rejected";

const data = [
  {
    state: "payed",
    color: "text-green-500",
    description: "Pago",
  },
  {
    state: "rejected",
    color: "text-red-500",
    description: "Rejeitado",
  },
  {
    state: "approved",
    color: "text-orange-500",
    description: "Aprovado",
  },
  {
    state: "pending",
    color: "text-red-700",
    description: "Pendente",
  },
];

export function stateColorDescription(state: state) {
  const data_filtered = data.filter((data) => data.state === state);
  return data_filtered[0];
}
