export const useQuery = () => {
  return 'useQuery'
}

export function useMutation() {

  const items = ['apple', 'banana', 'pear']

  const addItem = () => {}

  return {
    items,
    addItem,
  }
}
