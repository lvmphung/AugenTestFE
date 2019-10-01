import * as React from 'react';
import './Customers.css';
import { MDBDataTable } from 'mdbreact';
import { customerApi } from '../../api/customerApi';

interface CustomerProps {
  page?: number,
  search?: string,
  pageSize?: number
}
interface IHeader {
  label: string,
  field: string,
  sort: string,
  width?: number
}
interface IRows {
  firstname: string,
  lastname: string,
  email: string,
  phone1: string
}
interface CustomerState {
  data: {
    columns: IHeader[],
    rows: IRows[]
  },
  loading: boolean,
  errorMsg: string
}

interface CustomerModel {
  FirstName: string,
  LastName: string,
  Email: string,
  Phone1: string
}

const headerColumnCustomer: IHeader[] = [
  {
    label: 'First',
    field: 'firstname',
    sort: 'asc'
  },
  {
    label: 'Last',
    field: 'lastname',
    sort: 'asc'
  },
  {
    label: 'Email',
    field: 'email',
    sort: 'asc'
  },
  {
    label: 'Phone1',
    field: 'phone1',
    sort: 'asc'
  }
];

class Customer extends React.PureComponent<CustomerProps, CustomerState> {
  constructor(props: CustomerProps) {
    super(props);

    this.state = {
      data: {
        columns: headerColumnCustomer,
        rows: []
      },
      loading: true,
      errorMsg: ''
    }
  }

  private async fetchData(){
    var respons = await customerApi.getCustomers();
    if(typeof(respons) === 'string'){
      this.setState({
        loading: false,
        errorMsg: respons
      });
    }else {
      if(!respons.Success){
        this.setState({
          loading: false,
          errorMsg: respons.Message
        });
      } else {
        this.setState({
          loading: false,
          errorMsg: respons.Message,
          data: {
            columns: headerColumnCustomer,
            rows: this.buildData(respons.Data)
          }
        });
      }
    }
  }

  private buildData(dataModel: CustomerModel[]) {
    const dataRowTable: IRows[] = [];
    dataModel.forEach((value: CustomerModel) => {
      dataRowTable.push({
        firstname: value.FirstName,
        lastname: value.LastName,
        email: value.Email,
        phone1: value.Phone1
      });
    });
    return dataRowTable;
  }

  public componentDidMount() {
    this.fetchData();
  }

  public render() {
    const {loading, data, errorMsg} = this.state;
    return (
      <div className="block-center">
        {loading && <p>Loading ...</p>}
        {errorMsg && <div className="alert alert-danger" role="alert">Detail error: {errorMsg}</div>}
        <MDBDataTable
          striped
          displayEntries={false}
          bordered
          small
          theadColor="darkgray"
          hover
          data={data}
        />
      </div>
    );
  }
}

export default Customer;