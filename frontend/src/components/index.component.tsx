import * as React from "react";
import TableRow from "./ViewAllBookings";
import Booking from "../models/booking";
import BaseService from "../service/base.service";
import * as toastr from "toastr";
interface IProps {}
interface IState {
  listBookings: Array<Booking>;
  isReady: Boolean;
  hasError: Boolean;
}

class Index extends React.Component<IProps, IState> {
  public state: IState = {
    listBookings: new Array<Booking>(),
    isReady: false,
    hasError: false,
  };
  constructor(props: IProps) {
    super(props);
    this.state = {
      isReady: false,
      listBookings: Array<Booking>(),
      hasError: false,
    };
  }

  public componentDidMount() {
    BaseService.getAll<Booking>("/booking").then((rp) => {
      if (rp.Status) {
        const data = rp.Data;
        const listBookings = new Array<Booking>();

        (data || []).forEach((p: any) => {
          listBookings.push(new Booking(
            p._id,  
            p.nric,
            p.citizenName, 
            p.citizenSalutation, 
            p.citizenEmail,
            p.citizenNumber,

            p.serviceName, 
            p.serviceProviderName, 
            p.serviceProviderEmail,
            p.serviceProviderPhone, 
            p.serviceStartDate,
            p.serviceStartTime, 
            p.serviceProviderLocation,
            p.bookingStatus,
            
            ));
        });

        this.setState({ listBookings: listBookings }); 
        this.setState({ isReady: true });
      } else {
        this.setState({ isReady: true });
        this.setState({ hasError: true });
        console.log("Messages: " + rp.Messages);
        console.log("Exception: " + rp.Exception);
      }
    });

    setTimeout(() => {
      if (!this.state.isReady) {
        toastr.info(
          "It is possible that the service is being restarted, please wait more ...",
          "",
          { timeOut: 8000 }
        );
      }

      if (this.state.hasError) {
        toastr.error(
          "An error occurred!",
          "",
          { timeOut: 8000 }
        );
      }
    }, 2000);
  }

  public tabRow = () => {
    if (!this.state.isReady) {
      return (
        <tr>
          <td colSpan={6} className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
      );
    }
    if (this.state.hasError) {
      return (
        <tr>
          <td colSpan={6} className="text-center">
            <div className="alert alert-danger" role="alert">
              An error occurred!
            </div>
          </td>
        </tr>
      );
    }

    return this.state.listBookings.map(function (object, i) {
      return <TableRow key={i} index={i + 1} booking={object} />;
    });
  };

  public render(): React.ReactNode {
    return (
      <div>
        <h3 className="text-center">Bookings List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Index</th>
              <th>Nric</th>
              <th>CitizenName</th>
              <th>CitizenSalutation</th>
              <th>CitizenEmail</th>
              <th>CitizenNumber</th>

              <th>ServiceName</th>
              <th>ServiceProviderName</th>
              <th>ServiceProviderEmail</th>
              <th>ServiceProviderPhone</th>
              <th>ServiceStartDate</th>
              <th>ServiceStartTime</th>
              <th>ServiceProviderLocation</th>
              <th>BookingStatus</th>
              
              <th className="text-center" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}
export default Index;
