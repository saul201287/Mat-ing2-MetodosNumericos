import './MethodTable.css'

type props = {
    headers: string[],
    methodData: any[]
}

export default function MethodTable({headers, methodData}: props) {

    return <table className="method-table">
        <thead>
            <tr>
                <td>i</td>
                    {
                        headers.map((header, index) => <td key={`tableHeader${index}`}>{header}</td>)
                    }
            </tr>
        </thead>
        <tbody>
            {
                methodData.map((data, index) => <tr key={`row${index}`}>
                    <td>{index+ 1}</td>
                    {
                        headers.map((header, index) => <td key={header+index}>{data[header]}</td>)
                    }
                </tr>)
            }
        </tbody>
    </table>
}