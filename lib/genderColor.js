export const genderColor = (val) => {
  if (val === "female") return "!bg-pink-700"
  if (val === "male") return "!bg-blue-500"
  if (val === "others") return "w-full h-16 bg-[linear-gradient(to_right,_red,_orange,_yellow,_green,_blue,_indigo,_violet)]"
  return "!bg-gray-400"
}
