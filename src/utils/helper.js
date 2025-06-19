// export function filterData (searchText,allRestaurents){
//   return (allRestaurents.filter((restaurent)=>{
//       return restaurent?.data?.name.toLowerCase()?.includes(searchText.toLowerCase())
//   }))
// }
export const filterData = (searchText, restaurants) => {
  const resFilterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return resFilterData;
}