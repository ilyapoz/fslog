export default function Dev(props) {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return props.children;
}
