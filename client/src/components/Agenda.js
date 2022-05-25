import React, { Component } from "react";
import moment from "moment";
import {
  ReactAgenda,
  ReactAgendaCtrl,
  guid,
  getUnique,
  getLast,
  getFirst,
  Modal,
} from "react-agenda";
require("moment/locale/pt-br.js");

const NOW = new Date();
const COLORS = {
  "color-1": "rgba(102, 195, 131 , 1)",
  "color-2": "rgba(242, 177, 52, 1)",
  "color-3": "rgba(235, 85, 59, 1)",
  "color-4": "rgba(70, 159, 213, 1)",
  "color-5": "rgba(170, 59, 123, 1)",
};

const items = [
  {
    _id: guid(),
    name: "Conference , plaza",
    startDateTime: new Date(
      NOW.getFullYear(),
      NOW.getMonth(),
      NOW.getDate() + 1,
      11,
      0
    ),
    endDateTime: new Date(
      NOW.getFullYear(),
      NOW.getMonth(),
      NOW.getDate() + 1,
      14,
      30
    ),
    classes: "color-4",
  },
  {
    _id: "event-6",
    name: "Fun Day !",
    startDateTime: new Date(
      NOW.getFullYear(),
      NOW.getMonth(),
      NOW.getDate() + 7,
      9,
      14
    ),
    endDateTime: new Date(
      NOW.getFullYear(),
      NOW.getMonth(),
      NOW.getDate() + 7,
      17
    ),
    classes: "color-3",
  },
];

export default class Agenda extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selected: [],
      cellHeight: 60 / 4,
      showModal: false,
      locale: "pt-br",
      rowsPerHour: 4,
      numberOfDays: 4,
      startDate: new Date(),
    };
    this.handleRangeSelection = this.handleRangeSelection.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleCellSelection = this.handleCellSelection.bind(this);
  }

  componentDidMount() {
    // TODO: Fazer get, pegando todos os agendamentos!
    this.setState({ items: items });
  }

  componentWillReceiveProps(next, last) {
    if (next.items) {
      this.setState({ items: next.items });
    }
  }

  handleItemEdit(item, openModal) {
    if (item && openModal === true) {
      this.setState({ selected: [item] });
      return this._openModal();
    }
  }

  handleCellSelection(item, openModal) {
    if (this.state.selected && this.state.selected[0] === item) {
      return this._openModal();
    }
    this.setState({ selected: [item] });
  }

  handleDateRangeChange(startDate, endDate) {
    this.setState({ startDate: startDate });
  }

  handleRangeSelection(selected) {
    this.setState({ selected: selected, showCtrl: true });
    this._openModal();
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ showModal: false });
  }

  handleItemChange(items, item) {
    this.setState({ items: items });
  }

  handleItemSize(items, item) {
    this.setState({ items: items });
  }

  removeEvent(items, item) {
    console.log("item: ", item); // TODO: dar delete no banco

    this.setState({ items: items });
  }

  addNewEvent(items, newItems) {
    console.log("newItems: ", newItems); // TODO: Salvar NOVO AGENDAMENTO!!

    this.setState({ showModal: false, selected: [], items: items });
    this._closeModal();
  }

  editEvent(items, item) {
    console.log("item: ", item); // TODO: Dar update no banco!!

    this.setState({ showModal: false, selected: [], items: items });
    this._closeModal();
  }

  changeView(days, event) {
    this.setState({ numberOfDays: days });
  }

  render() {
    return (
      <div className="content-expanded">
        <div className="control-buttons">
          <button
            className="button-control"
            onClick={this.changeView.bind(null, 7)}
          >
            {moment.duration(7, "days").humanize()}
          </button>

          <button
            className="button-control"
            onClick={this.changeView.bind(null, 4)}
          >
            {moment.duration(4, "days").humanize()}
          </button>

          <button
            className="button-control"
            onClick={this.changeView.bind(null, 3)}
          >
            {moment.duration(3, "days").humanize()}
          </button>

          <button
            className="button-control"
            onClick={this.changeView.bind(null, 1)}
          >
            {moment.duration(1, "day").humanize()}
          </button>
        </div>

        <ReactAgenda
          minDate={new Date(NOW.getFullYear(), NOW.getMonth() - 3)}
          maxDate={new Date(NOW.getFullYear(), NOW.getMonth() + 3)}
          startDate={this.state.startDate}
          startAtTime={8}
          endAtTime={23}
          cellHeight={this.state.cellHeight}
          locale="pt-br"
          items={this.state.items}
          numberOfDays={this.state.numberOfDays}
          headFormat={"ddd DD MMM"}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={COLORS}
          helper={true}
          view="calendar"
          autoScale={false}
          fixedHeader={true}
          onRangeSelection={this.handleRangeSelection.bind(this)}
          onChangeEvent={this.handleItemChange.bind(this)}
          onChangeDuration={this.handleItemSize.bind(this)}
          onItemEdit={this.handleItemEdit.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
          onItemRemove={this.removeEvent.bind(this)}
          onDateRangeChange={this.handleDateRangeChange.bind(this)}
        />

        {this.state.showModal && (
          <Modal clickOutside={this._closeModal}>
            <div className="modal-content">
              <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
              <ReactAgendaCtrl
                items={this.state.items}
                itemColors={COLORS}
                selectedCells={this.state.selected}
                Addnew={this.addNewEvent}
                edit={this.editEvent}
              />
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
