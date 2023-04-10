import React from 'react'
import Layout from '~/components/Layout';


interface Props {
  title: string;
}
const settings = ({ title }: Props)=> {
  return (
    <Layout pageTitle={title}>
      <div className="min-h-screen flex flex-col">
        <div className="m-auto">
          <h1 className="text-4xl">settings</h1>
        </div>
      </div>
    </Layout>
  )
}

export default settings