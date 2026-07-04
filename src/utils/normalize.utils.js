// Elimina espacios al inicio/final y reemplaza múltiples espacios por uno.
export const cleanText = (value) => {
  if (!value) return "";

  return value.trim().replace(/\s+/g, " ");
};

// Elimina todo excepto números. "(011) 3046-2293" -> "01130462293"
export const cleanPhone = (phone) => {
  if (!phone) return "";

  return phone.replace(/\D/g, "");
};

// Capitaliza cada palabra respetando acentos. "gAbRiEl nIcOlOsI" -> "Gabriel Nicolosi"
export const capitalizeWords = (text) => {
  return cleanText(text)
    .toLowerCase()
    .replace(/\b\p{L}/gu, (letter) => letter.toUpperCase());
};

const normalizeAddress = (text = "") => {
  const words = capitalizeWords(text).split(" ");

  return words
    .map((word) => {
      const key = word.toLowerCase().replace(".", "");

      return ADDRESS_ABBREVIATIONS[key] || word;
    })
    .join(" ");
};
const cleanAddress = (address) => ({
  address_alias: capitalizeWords(address.address_alias),

  address: normalizeAddress(address.address),

  between_streets: normalizeAddress(address.between_streets),

  location: capitalizeWords(address.location),

  additional_data: cleanText(address.additional_data),
});
