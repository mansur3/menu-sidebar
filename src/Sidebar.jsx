import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Logo from "../../assests/images/header-logo.png";
import { getValue } from "@testing-library/user-event/dist/utils";

const Sidebar = () => {
  const [menuList, setMenuList] = useState([]);
  const [apiList, setApiList] = useState([]);
  const [selectedMenuName, setselectedMenuName] = useState("Home");
  const [selectedSubMenuName, setselectedSubMenuName] = useState("");
  const [selectedApiName, setselectedApiName] = useState("");
  const [selectedApiId, setselectedApiId] = useState("");
  const [menuArr, setMenuArr] = useState([]);

  // const getData = (menuArr, mnuObj, menuTitle, parentIndex) => {
  //   console.log(
  //     "getData function------------------>",
  //     menuArr,
  //     mnuObj,
  //     menuTitle,
  //     parentIndex
  //   );
  //   if (menuTitle) {
  //     let mTArr = menuTitle.split("+");
  //     console.log("mTArr--------------->", mTArr);
  //     const cName = mTArr.length > 0 ? mTArr[0] : "";

  //     if (mTArr.length === 1) {
  //       console.log("if called------------->", mTArr, mnuObj);
  //       const newMenuObj = {
  //         ...mnuObj,
  //         title: mTArr[0],
  //         parentMenu: parentIndex,
  //       };
  //       menuArr.push(newMenuObj);
  //     }

  //     mTArr.shift();
  //     console.log("mArr Shifted--------------->", mTArr);
  //     if (mTArr.length) {
  //       getData(menuArr, mnuObj, mTArr.join("+"), cName);
  //     }
  //   }
  // };
  const getDemoData = (menuArr, mnuObj, menuTitle, parentIndex, parentObj) => {
    if (menuTitle) {
      let mTArr = menuTitle.split("+");
      const cName = mTArr.length > 0 ? mTArr[0] : "";

      console.log("parentObj==========>", menuTitle, parentIndex, parentObj);

      if (mTArr.length === 1) {
        const newMenuObj = { ...mnuObj, title: cName, parentMenu: parentIndex }; // menuArr.push(newMenuObj);
        if (parentObj) {
          console.log("parentObj================", parentObj);
          if (parentObj["children"] && parentObj["children"][cName]) {
            parentObj["children"][cName].push(newMenuObj);
          } else if (parentObj["children"]) {
            parentObj["children"][cName] = [newMenuObj];
          } else {
            parentObj["children"] = [];
            parentObj["children"][cName] = [newMenuObj];
          }
        } else {
          menuArr[cName] = newMenuObj;
        }
      }

      mTArr.shift();
      if (mTArr.length) {
        if (parentIndex) {
          console.log("sd==========", parentIndex, cName);
          let pcObj = { ...parentObj[parentIndex], cName: {} };
          getData(menuArr, mnuObj, mTArr.join("+"), cName, pcObj);
        } else {
          console.log("sd==========111", parentIndex, cName);
          getData(menuArr, mnuObj, mTArr.join("+"), cName, menuArr[cName]);
        }
      }
    }
  };

  const getData = (menuArr, mnuObj, menuTitle, parentIndex) => {
    // console.log(
    //   "getData function------------------>",
    //   menuArr,
    //   mnuObj,
    //   menuTitle,
    //   parentIndex
    // );
    if (menuTitle) {
      let mTArr = menuTitle.split("+");
      // console.log("mTArr--------------->", mTArr);
      const cName = mTArr.length > 0 ? mTArr[0] : "";

      if (mTArr.length === 1) {
        // console.log("if called------------->", mTArr, mnuObj, parentIndex);
        const newMenuObj = {
          ...mnuObj,
          title: mTArr[0],
          parentMenu: parentIndex,
        };
        if (menuArr.find((x, index) => x.title == parentIndex)) {
          menuArr.map((x, index) => {
            let arr = x?.subMenu?.length > 0 ? x.subMenu : [];
            if (x.title == parentIndex) {
              arr.push(newMenuObj);
              // console.log("mTArrMap--------------->", x);
              x["subMenu"] = arr;
              // return (x = {
              //   ...x,
              //   subMenu: "hjg",
              // });
            }
          });
          // console.log("obj------------>", obj);
          // obj = {
          //   ...obj,
          //   subMenu: [mnuObj],
          // };
        }
        // console.log("changed menu ARR------------->", menuArr);
        // const newMenuObj = {
        //   ...mnuObj,
        //   title: mTArr[0],
        //   parentMenu: parentIndex,
        // };
        menuArr.push(newMenuObj);
        // console.log("if called menu ARR------------->", menuArr);
      }
      // if (mTArr.length > 1) {
      // }
      mTArr.shift();
      // console.log("mArr Shifted--------------->", mTArr);
      if (mTArr.length) {
        getData(menuArr, mnuObj, mTArr.join("+"), cName);
      }
    }
  };

  const handleMenuList = () => {
    // const headerApplication = {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     "Content-Type": "application/json",
    //   },
    // };
    // axios
    //   .get(
    //     `https://10.0.10.4:9443/api/am/devportal/v2/subscriptions?applicationId=${localStorage.getItem(
    //       "applicationId"
    //     )}`,
    //     headerApplication
    //   )
    //   .then((res) => {
    //     axios
    //       .get(
    //         `https://10.0.10.4:9443/api/am/devportal/v2/api-categories`,
    //         headerApplication
    //       )
    //       .then((resp) => {
    //Menu Logic Implementation

    // const myArray = [
    //   {
    //     id: "edf85918-3a56-4ece-a7aa-7296f35ccada",
    //     name: "AEPS",
    //     description: '"AEPS" group of APIs',
    //   },
    //   {
    //     id: "a94dadbb-8290-409b-bfea-76655a29694c",
    //     name: "AEPS+AadhaarVaultSpecs",
    //     description: '"Aadhaar Vault Specs" API under "AEPS" group',
    //   },
    //   {
    //     id: "a94dadbb-8290-409b-bfea-76655a29694c",
    //     name: "AEPS+AadhaarVaultSpecs+NewOnes",
    //     description: '"Aadhaar Vault Specs" API under "AEPS" group',
    //   },
    //   {
    //     id: "0ff5a4d5-a758-40b3-8b04-304c0c952906",
    //     name: "AEPS+DigiFundTransfer",
    //     description: '"DigiFundTransfer" group of APIs under AEPS',
    //   },
    //   {
    //     id: "b836b4d5-b8e6-4aca-a3cd-26a6992fb1e6",
    //     name: "BBPS",
    //     description: '"BBPS" group of APIs',
    //   },
    //   {
    //     id: "094a73f2-7b60-4000-8675-78085b4764cd",
    //     name: "CCCustomerReporting",
    //     description: "CCCustomerReporting API (isolated)",
    //   },
    //   {
    //     id: "fa44ec1d-11eb-403f-a2a4-b7e59a8cf102",
    //     name: "DigiAccountReporting",
    //     description: "DigiAccountReporting API (isolated)",
    //   },
    //   {
    //     id: "4780819a-7724-4e72-a74b-fe15412a6822",
    //     name: "Fastag",
    //     description: '"Fastag" group of APIs',
    //   },
    //   {
    //     id: "d88e374f-2b9d-46d4-8722-eaf3b3bb0b74",
    //     name: "Final",
    //     description: '"Final" group of APIs',
    //   },
    //   {
    //     id: "9e9f6152-01f4-405a-bdcc-4e724ced5727",
    //     name: "NEFT_RTGS+Indus",
    //     description: '"NEFT_RTGS" group of APIs',
    //   },
    //   {
    //     id: "9e9f6152-01f4-405a-bdcc-4e724ced5729",
    //     name: "NEFT_RTGS+Indus+hhfsdf+hfsdfsdh+jhgfff",
    //     description: '"NEFT_RTGS" group of APIs',
    //   },
    //   {
    //     id: "aa690cd6-8654-4a87-9470-537856a72b9f",
    //     name: "OnboardingCustomerAPI",
    //     description: '"OnboardingCustomerAPI" group of APIs',
    //   },
    //   {
    //     id: "d1e87fce-6cb4-4df3-9145-673348a2199a",
    //     name: "OTPAdapter",
    //     description: "OTPAdapter API (isolated)",
    //   },
    //   {
    //     id: "07b9e775-85db-4168-b28a-9e6224177351",
    //     name: "SMS_EMAIL",
    //     description: '"SMS_EMAIL" group of APIs',
    //   },
    //   {
    //     id: "518fa863-28a7-4304-93ed-ec304189ecc7",
    //     name: "UPI",
    //     description: '"UPI" group of APIs',
    //   },
    //   {
    //     id: "0035c129-e5fd-4956-a543-17309bdd3fe5",
    //     name: "VideoKYC",
    //     description: '"VideoKYC" group of APIs',
    //   },
    // ];
    // let aArray = [];
    // for (let i = 0; i < myArray.length; i++) {
    //   aArray.push(myArray[i].name);
    // }
    // let cArray = [];
    // for (let j = 0; j < aArray.length; j++) {
    //   const splitVal = aArray[j].split("+");
    //   if (!Array.isArray(cArray[splitVal[0]])) cArray[splitVal[0]] = [];
    //   if (splitVal.length > 1) {
    //     getValue(splitVal[0],splitVal[splitVal.length - 1],cArray)
    //     // if (splitVal.length === 2 && !Array.isArray(cArray[splitVal[0]][splitVal[splitVal.length - 1]]))
    //     //  cArray[splitVal[0]][splitVal[splitVal.length - 1]] = [];
    //     // if (splitVal.length > 2) {
    //       // cArray[splitVal[0]][splitVal[splitVal.length - 2]].push(splitVal[splitVal.length - 1]);
    //     // }
    //   }
    // }
    // console.log(cArray,"cArray============>>>>")
    var dataList = [
      {
        id: "7fdecf6f-df3a-4369-b284-36bb2c7b05611",
        name: "AEPS",
        description: '"AEPS" group of APIs',
      },
      {
        id: "b80ec1f2-c55e-408b-8d26-e3e5d8df87422",
        name: "sd",
        description: '"Aadhaar Vault Specs" API under "AEPS" group',
      },
      {
        id: "b80ec1f2-c55e-408b-8d26-e3e5d8df8744433",
        name: "AEPS+Aadhaar~Vault~Specs",
        description: '"Aadhaar Vault Specs" API under "AEPS" group',
      },
      {
        id: "b80ec1f2-c55e-408b-8d26-e3e5d8df885e44",
        name: "AEPS+Aadhaar~Vault~Specs+Indus",
        description: '"Aadhaar Vault Specs" API under "AEPS" group',
      },
      {
        id: "d4c01fb8-a227-4957-96c9-4bc48030706755",
        name: "AEPS+DigiFundTransfer",
        description: '"DigiFundTransfer" group of APIs under AEPS',
      },
      {
        id: "d4c01fb8-a227-4957-96c9-4bc48030706755",
        name: "AEPS+DigiFundTransfer+xyz",
        description: '"DigiFundTransfer" group of APIs under AEPS',
      },
      {
        id: "d4c01fb8-a227-4957-96c9-4bc48030706755",
        name: "AEPS+DigiFundTransfer+xyz+pou",
        description: '"DigiFundTransfer" group of APIs under AEPS',
      },
      {
        id: "d4c01fb8-a227-4957-96c9-4bc48030706755",
        name: "AEPS+DigiFundTransfer+xyz+pou+iopp",
        description: '"DigiFundTransfer" group of APIs under AEPS',
      },
      {
        id: "eeb38060-7cc2-4c5f-9f7c-81c94c734e000",
        name: "BBPS",
        description: '"BBPS" group of APIs',
      },
      {
        id: "eeb38060-7cc2-4c5f-9f7c-81c94c734e000",
        name: "BBPS+mnm",
        description: '"BBPS" group of APIs',
      },
      {
        id: "eeb38060-7cc2-4c5f-9f7c-81c94c734e04",
        name: "BBPS+mnm+abc",
        description: '"BBPS" group of APIs',
      },
      {
        id: "a645c21f-1fc5-49f0-af52-aa7bbb5b4919",
        name: "CCCustomerReporting",
        description: "CCCustomerReporting API (isolated)",
      },
      {
        id: "cd9dc8ec-000c-429d-bc30-eaa70ddcc105",
        name: "DigiAccountReporting",
        description: "DigiAccountReporting API (isolated)",
      },
      {
        id: "597ca9aa-e5b4-4683-8ca8-5f0edf7cb492",
        name: "Fastag",
        description: '"Fastag" group of APIs',
      },
      {
        id: "60669d5d-ac2e-4d4f-bb9d-4d372999e49d",
        name: "Final",
        description: '"Final" group of APIs',
      },
      {
        id: "61a3ba01-d814-4f62-a0f2-514f29015ac5",
        name: "NEFT_RTGS+New",
        description: '"NEFT_RTGS" group of APIs',
      },
      {
        id: "3e8f21f5-f237-4ca5-9701-dd9710017ae1",
        name: "OTPAdapter",
        description: "OTPAdapter API (isolated)",
      },
      {
        id: "e1f265d9-f6e1-490b-b08a-56b98cb4b58a",
        name: "OnboardingCustomerAPI",
        description: '"OnboardingCustomerAPI" group of APIs',
      },
      {
        id: "e99a3d35-b530-4e4d-8538-1c962ce190c8",
        name: "SMS_EMAIL",
        description: '"SMS_EMAIL" group of APIs',
      },
      {
        id: "d88ab5aa-3992-47f2-99e0-274f05a31f42",
        name: "UPI",
        description: '"UPI" group of APIs',
      },
      {
        id: "13a2f1d9-b3b1-4c16-8e55-57393b777bb4",
        name: "VideoKYC",
        description: '"VideoKYC" group of APIs',
      },
      {
        id: "d1622898-c948-46d3-b8d1-dd0038f0637b",
        name: "payments",
        description: "payments API",
      },
    ];

    let menuList = [];
    // resp.data &&
    //   resp.data.list &&
    dataList?.forEach((data) => {
      getData(menuList, data, data.name, null);
      // getDemoData(menuList, data, data.name, null);
      // console.log("forEach data----------->", data);
    });
    setMenuList(menuList);
    let newList = menuList.filter((item) => item.parentMenu == null);
    // console.log("Srinibas====================>", menuList);
    console.log("Subrata====================>", newList);
  };
  useEffect(() => {
    handleMenuList();
  }, []);
  return <div>This is the test</div>;

  // const getApiList = (id, index, menuName) => {
  //   console.log("menuName------------------>", menuName);
  //   // setselectedMenuName(menuName);
  //   localStorage.removeItem("menuNavigationName");
  //   const headerApplication = {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   axios
  //     .get(
  //       `https://10.0.10.4:9443/api/am/devportal/v2/search?limit=100&offset=0&query=api-category%3A${menuName}`
  //     )
  //     .then((res) => {
  //       console.log(res.data.list, "res======================>");

  //       axios
  //         .get(
  //           `https://10.0.10.4:9443/api/am/devportal/v2/subscriptions?applicationId=${localStorage.getItem(
  //             "applicationId"
  //           )}`,
  //           headerApplication
  //         )
  //         .then((resSubscriptionList) => {
  //           if (res.data.list.length > 0) {
  //             let result = res.data.list.filter((o1) =>
  //               resSubscriptionList.data.list.some((o2) => o1.id === o2.apiId)
  //             );
  //             console.log(result, "filterArrList===========>");
  //             setApiList(result);
  //           }
  //         });
  //     });
  // };
  // const getMenuName = (menuName) => {
  //   setselectedMenuName(menuName);
  // };
  // const getApiName = (apiName, apiId) => {
  //   localStorage.removeItem("apiNavigationName");
  //   setselectedApiName(apiName);
  //   setselectedApiId(apiId);
  // };
  // useEffect(() => {
  //   handleMenuList();
  //   !!localStorage.getItem("menuNavigationId") &&
  //     axios
  //       .get(
  //         `https://10.0.10.4:9443/api/am/devportal/v2/apis/${localStorage.getItem(
  //           "menuNavigationId"
  //         )}/swagger`
  //       )
  //       .then((res) => {
  //         setApiList(Object.values(res.data.paths));
  //       });
  // }, []);
  // const jsxFunction = (list) => {
  //   // return list.map((menu, i) => {
  //   //   if (menu.parentMenu == null) {
  //   //     console.log("jsxFunction");
  //   //     return (
  //   //       <li key={i}>
  //   //         <Link to="#" onClick={() => getApiList(menu.id, i, menu.name)}>
  //   //           {menu.title.replace("_", " ")}
  //   //         </Link>
  //   //         <ul
  //   //           className={
  //   //             (
  //   //               !!localStorage.getItem("menuNavigationName")
  //   //                 ? menu.title
  //   //                     .replace("_", " ")
  //   //                     .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
  //   //                       letter.toUpperCase()
  //   //                     ) ===
  //   //                   localStorage
  //   //                     .getItem("menuNavigationName")
  //   //                     .replace("_", " ")
  //   //                     .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
  //   //                       letter.toUpperCase()
  //   //                     )
  //   //                 : selectedMenuName === menu.title
  //   //             )
  //   //               ? "show"
  //   //               : "hide"
  //   //           }
  //   //         >
  //   //           {/* {menu?.subMenu?.length > 0 && jsxFunction(menu.subMenu)} */}
  //   //           {/* {apiList &&
  //   //             apiList.length > 0 &&
  //   //             apiList.map((api, key) => {
  //   //               const summary = api.summary;
  //   //               const summaryObj = !!summary && JSON.parse(summary);
  //   //               return (
  //   //                 <li key={key}>
  //   //                   <Link
  //   //                     to={`/swagger/${api.description}/${menu.id}/${menu.title}/${summaryObj.heading}/${summaryObj.desc}`}
  //   //                     className={
  //   //                       (
  //   //                         !!localStorage.getItem("apiNavigationName")
  //   //                           ? localStorage.getItem("apiNavigationName") ===
  //   //                               api.description &&
  //   //                             menu.id ===
  //   //                               localStorage.getItem("menuNavigationId")
  //   //                           : selectedApiName === api.description &&
  //   //                             menu.id === selectedApiId
  //   //                       )
  //   //                         ? "active"
  //   //                         : "inactive"
  //   //                     }
  //   //                     onClick={() => getApiName(api.description, menu.id)}
  //   //                   >
  //   //                     {api.name}
  //   //                   </Link>
  //   //                 </li>
  //   //               );
  //   //             })} */}
  //   //         </ul>
  //   //       </li>
  //   //     );
  //   //   }
  //   // });
  //   return list.map((subMenu, i) => (
  //     <li key={i}>
  //       <Link
  //         to="#"
  //         onClick={() => {
  //           setselectedSubMenuName(subMenu.title);
  //           getApiList(subMenu.id, i, subMenu.name);
  //         }}
  //       >
  //         {subMenu.title.replace("_", " ")}
  //       </Link>
  //       <ul
  //         className={
  //           (
  //             !!localStorage.getItem("menuNavigationName")
  //               ? subMenu.title
  //                   .replace("_", " ")
  //                   .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
  //                     letter.toUpperCase()
  //                   ) ===
  //                 localStorage
  //                   .getItem("menuNavigationName")
  //                   .replace("_", " ")
  //                   .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
  //                     letter.toUpperCase()
  //                   )
  //               : selectedSubMenuName === subMenu.title
  //           )
  //             ? "show"
  //             : "hide"
  //         }
  //       >
  //         {selectedSubMenuName === subMenu.title &&
  //           subMenu?.subMenu &&
  //           jsxFunction(subMenu.subMenu)}
  //         {/* {subMenu?.subMenu?.length > 0 &&
  //           subMenu.subMenu.map((subMenu2, i) => (
  //             <li key={i}>
  //               <Link
  //                 to="#"
  //                 onClick={() => getApiList(subMenu2.id, i, menu.name)}
  //               >
  //                 {subMenu2.title.replace("_", " ")}
  //               </Link>
  //             </li>
  //           ))} */}
  //       </ul>
  //     </li>
  //   ));
  // };
  // console.log("final list------------------->", menuList);
  // console.log("selectedMenuName------------------->", selectedMenuName);
  // return (
  //   <aside className="main-sidebar">
  //     <div id="menu_content">
  //       <section className="sidebar">
  //         <div className="SiteLogo">
  //           <Link to="/">
  //             <img src={Logo} />
  //           </Link>
  //         </div>
  //         <ul className="SidebarMenu" data-widget="tree">
  //           <li>
  //             <Link
  //               to="/home"
  //               className={
  //                 selectedMenuName === "Home" &&
  //                 localStorage.getItem("apiNavigationName") == null
  //                   ? "active"
  //                   : "inactive"
  //               }
  //               onClick={() => getMenuName("Home")}
  //             >
  //               Home
  //             </Link>
  //           </li>

  //           {menuList &&
  //             menuList.length > 0 &&
  //             menuList.map((menu, i) => {
  //               if (menu.parentMenu == null) {
  //                 return (
  //                   <li key={i}>
  //                     <Link
  //                       to="#"
  //                       onClick={(e) => {
  //                         console.log("target==========", e.target);
  //                         setselectedMenuName(menu.title);
  //                         getApiList(menu.id, i, menu.title);
  //                       }}
  //                     >
  //                       {menu.title.replace("_", " ")}
  //                     </Link>
  //                     <ul
  //                       className={
  //                         (
  //                           !!localStorage.getItem("menuNavigationName")
  //                             ? menu.title
  //                                 .replace("_", " ")
  //                                 .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
  //                                   letter.toUpperCase()
  //                                 ) ===
  //                               localStorage
  //                                 .getItem("menuNavigationName")
  //                                 .replace("_", " ")
  //                                 .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
  //                                   letter.toUpperCase()
  //                                 )
  //                             : selectedMenuName === menu.title
  //                         )
  //                           ? "show"
  //                           : "hide"
  //                       }
  //                     >
  //                       {/* {menu?.subMenu?.length > 0 &&
  //                         menu.subMenu.map((subMenu, i) => (
  //                           <li key={i}>
  //                             <Link
  //                               to="#"
  //                               onClick={() =>
  //                                 getApiList(subMenu.id, i, menu.name)
  //                               }
  //                             >
  //                               {subMenu.title.replace("_", " ")}
  //                             </Link>
  //                             <ul
  //                               className={
  //                                 (
  //                                   !!localStorage.getItem("menuNavigationName")
  //                                     ? subMenu.title
  //                                         .replace("_", " ")
  //                                         .replace(
  //                                           /(^\w{1})|(\s+\w{1})/g,
  //                                           (letter) => letter.toUpperCase()
  //                                         ) ===
  //                                       localStorage
  //                                         .getItem("menuNavigationName")
  //                                         .replace("_", " ")
  //                                         .replace(
  //                                           /(^\w{1})|(\s+\w{1})/g,
  //                                           (letter) => letter.toUpperCase()
  //                                         )
  //                                     : selectedMenuName === menu.title
  //                                 )
  //                                   ? "show"
  //                                   : "hide"
  //                               }
  //                             >
  //                               {subMenu?.subMenu?.length > 0 &&
  //                                 subMenu.subMenu.map((subMenu2, i) => (
  //                                   <li key={i}>
  //                                     <Link
  //                                       to="#"
  //                                       onClick={() =>
  //                                         getApiList(subMenu2.id, i, menu.name)
  //                                       }
  //                                     >
  //                                       {subMenu2.title.replace("_", " ")}
  //                                     </Link>
  //                                   </li>
  //                                 ))}
  //                             </ul>
  //                           </li>
  //                         ))} */}
  //                       {selectedMenuName === menu.title &&
  //                         menu?.subMenu?.length > 0 &&
  //                         jsxFunction(menu.subMenu)}
  //                       {/* {apiList &&
  //                         apiList.length > 0 &&
  //                         apiList.map((api, key) => {
  //                           const summary = api.summary;
  //                           const summaryObj = !!summary && JSON.parse(summary);
  //                           return (
  //                             <li key={key}>
  //                               <Link
  //                                 to={`/swagger/${api.description}/${menu.id}/${menu.title}/${summaryObj.heading}/${summaryObj.desc}`}
  //                                 className={
  //                                   (
  //                                     !!localStorage.getItem(
  //                                       "apiNavigationName"
  //                                     )
  //                                       ? localStorage.getItem(
  //                                           "apiNavigationName"
  //                                         ) === api.description &&
  //                                         menu.id ===
  //                                           localStorage.getItem(
  //                                             "menuNavigationId"
  //                                           )
  //                                       : selectedApiName === api.description &&
  //                                         menu.id === selectedApiId
  //                                   )
  //                                     ? "active"
  //                                     : "inactive"
  //                                 }
  //                                 onClick={() =>
  //                                   getApiName(api.description, menu.id)
  //                                 }
  //                               >
  //                                 {api.name}
  //                               </Link>
  //                             </li>
  //                           );
  //                         })} */}
  //                     </ul>
  //                   </li>
  //                 );
  //               }
  //             })}
  //           {/* {menuList?.length && jsxFunction(menuList)} */}
  //         </ul>
  //       </section>
  //     </div>
  //   </aside>
  // );
};
export default Sidebar;
