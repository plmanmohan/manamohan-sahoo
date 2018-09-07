import { Profile } from "../../Profile";
import { PearsonUsers } from "../PearsonUsers";
import { removeUser, removeDuplicateUsers } from "../../../utility/user-functions";


jest.mock('../../../utility/api.js');

describe('Test PearsonUsers component', () => {

  it('renders without crashing', () => {
    shallow(<PearsonUsers />);
  });

  it("Render <PearsonUsers/>", () => {
    const wrapper = shallow( <PearsonUsers /> );
   expect(wrapper).toMatchSnapshot();
    const h1 = wrapper.find("h1");
    expect(h1.text()).toEqual("Pearson User Management ");
  });
  
  //remove duplicated users from the state add only unique into state
  it("removeDuplicateUsers removes duplicates adds unique users into state and ", () => {
    const oldUserList = [
      { id: 2, first_name: "Janet", last_name: "Weaver", avatar: "128.jpg" },
      { id: 3, first_name: "Emma", last_name: "Wong", avatar: "128.jpg" }
    ];
    const newUserList = [
      { id: 12, first_name: "Rachel", last_name: "Howell", avatar: "128.jpg" },
      { id: 2, first_name: "Janet", last_name: "Weaver", avatar: "128.jpg" }
    ];
    const finalUserList = removeDuplicateUsers(oldUserList, newUserList);
    expect(finalUserList).toEqual([
      { id: 2, first_name: "Janet", last_name: "Weaver", avatar: "128.jpg" },
      { id: 3, first_name: "Emma", last_name: "Wong", avatar: "128.jpg" },
      { id: 12, first_name: "Rachel", last_name: "Howell", avatar: "128.jpg" }
    ]);
  });

  //removeUser
  it("removeUser removes the user", () => {
    const state = {
      users: [                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {
          id: 2,
          first_name: "Janet",
          last_name: "Weaver",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
        },
        {
          id: 3,
          first_name: "Emma",
          last_name: "Wong",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"
        },
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        }
      ]
    };
    const id = 3;
    const finalState = removeUser(state, id);
    expect(finalState).toEqual([
      {
        id: 2,
        first_name: "Janet",
        last_name: "Weaver",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"
      },
      {
        id: 4,
        first_name: "Eve",
        last_name: "Holt",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
      }
    ]);
  });

  it("Render <profile/>", () => {
    const state = {
      users: [
        { id: 11, first_name: "George", last_name: "Edwards", avatar: "128.jpg" }
      ]
    };
    const wrapper = shallow(
      <Profile key={11} user={state.users[0]} onDelete={() => {}} />
    );
  
    const p = wrapper.find("p");
    expect(p.text()).toEqual("George Edwards");
  });

  it("Render initial state data", () => {
    const wrapper = shallow(<PearsonUsers />);
    const finalState = wrapper.instance().displayUsers();
    expect(finalState.length).toEqual(3);
  });
 });

