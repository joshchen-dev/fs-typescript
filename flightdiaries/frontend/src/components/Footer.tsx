const Footer = ({ total }: { total: number }) => {
  return (
    <div>
      <em>You have {total} enties in total.</em>
    </div>
  )
}

export default Footer