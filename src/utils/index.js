export const musicalTypes = [
  "Rock",
  "Funk",
  "Sertanejo",
  "MPB",
  "Forró",
  "Samba",
];

export const handleChangeDate = (value, oldValue, changeValue) => {
  if (
    !isNaN(value[value.length - 1]) ||
    value[value.length - 1] === "/" ||
    value === ""
  ) {
    if (value.length < oldValue.length) {
      if (oldValue.length === 6) changeValue(value.substr(0, 4));
      else if (oldValue.length === 3) changeValue(value[0]);
      else changeValue(value);
    }
    if (value === "" || value.length === 8) changeValue(value);
    else if (value.length === 1 && ["0", "1", "2", "3"].includes(value[0] + ""))
      changeValue(value);
    else if (value.length === 2 && oldValue.length < 2) {
      if (["0", "1", "2"].includes(value[0] + "")) changeValue(value + "/");
      else if (["3"].includes(value[0] + "") && value[1] + "" === "1")
        changeValue(value + "/");
    } else if (value.length === 4 && ["0", "1"].includes(value[3]))
      changeValue(value);
    else if (value.length === 5 && oldValue.length < 5) {
      if (value[3] + "" === "0" && value[4] + "" !== "0")
        changeValue(value + "/");
      else if (value[3] + "" === "1" && ["0", "1", "2"].includes(value[4] + ""))
        changeValue(value + "/");
    } else if (value.length === 7 && ["1", "2"].includes(value[6]))
      changeValue(value);
    else if (value.length > 7) changeValue(value.replace(/(\r\n|\n|\r)/gm, ""));
  }
};

export const handleChangeTime = (value = "", oldValue = "", changeValue) => {
  if (
    !isNaN(value[value.length - 1]) ||
    value[value.length - 1] === ":" ||
    value === ""
  ) {
    if (value.length < oldValue.length) {
      // if (oldValue.length === 6) changeValue(value.substr(0, 4));
      // else
      if (oldValue.length === 3) changeValue(value[0]);
      else changeValue(value);
    }
    // if (value === "" || value.length === 8) changeValue(value);
    // else
    if (value.length === 1 && ["1", "2", "0"].includes(value[0] + ""))
      changeValue(value);
    else if (value.length === 2 && oldValue.length < 2) {
      if (["1", "0"].includes(value[0] + "")) changeValue(value + ":");
      else if (["0", "1", "2", "3"].includes(value[1]))
        changeValue(value + ":");
    } else if (
      value.length === 4 &&
      ["0", "1", "2", "3", "4", "5"].includes(value[3])
    )
      changeValue(value);
    else if (value.length === 5 && oldValue.length < 5) changeValue(value);
    // changeValue(value + ":");
    // else if (
    //   value.length === 7 &&
    //   ["0", "1", "2", "3", "4", "5"].includes(value[6])
    // )
    //   changeValue(value);
  }
};
