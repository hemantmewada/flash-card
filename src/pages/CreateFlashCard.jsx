import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import CreateGroupCard from "../components/CreateGroupCard";
import AddTermsAndConditions from "../components/AddTermsAndConditions";
import CreateButton from "../components/CreateButton";
import { Formik } from "formik";
import { toast } from "react-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCards } from "../redux/state";

const CreateFlashCard = () => {
  const cards = useSelector((state) => state.cards);
  const dispatch = useDispatch();
  // console.log("cards", cards.length);
  const initialValues = {
    id: cards.length,
    groupImage: "",
    groupName: "",
    groupDescription: "",
    terms: [{ id: 0, title: "", definition: "", image: "" }],
  };

  return (
    <>
      <Header />
      <div className="px-5 sm:px-20 md:px-40 py-5 sm:py-10">
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.groupDescription) {
              errors.groupDescription = "Group Description is required";
            } else if (values.groupDescription.length < 25) {
              errors.groupDescription = "Group Description is too short.";
            }
            if (values.groupName == "") {
              errors.groupName = "Group Name is required";
            }

            // Validate terms
            values.terms.forEach((term, index) => {
              if (!term.title) {
                if (!errors.terms) errors.terms = [];
                if (!errors.terms[index]) errors.terms[index] = {};
                errors.terms[index].title = "Title is required";
              }
              if (!term.definition) {
                if (!errors.terms) errors.terms = [];
                if (!errors.terms[index]) errors.terms[index] = {};
                errors.terms[index].definition = "Definition is required";
              }
            });
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            localStorage.setItem("cards", JSON.stringify([...cards, values]));
            dispatch(setCards([...cards, values]));
            toast.success("Flash Card Created Successfully.");
            resetForm({ values: initialValues });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setValues,
          }) => {
            const handleChangeGroupImage = (e) => {
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = () => {
                setValues({ ...values, groupImage: reader.result });
              };
            };

            // change the input values for title and definition
            const handleChangeTerm = (e, index) => {
              const { name, value } = e.target;
              let list = [...values.terms];
              list[index][name] = value;
              setValues({
                ...values,
                terms: list,
              });
            };
            // add more terms
            const addMore = () => {
              const list = [
                ...values.terms,
                {
                  id: values.terms.length,
                  title: "",
                  definition: "",
                  image: "",
                },
              ];
              setValues({
                ...values,
                terms: list,
              });
            };
            // remove the perticular term
            const remove = (index) => {
              let list = [...values.terms];
              if (list.length > 1) {
                if (confirm("Are you sure do you want to delete?")) {
                  list.splice(index, 1);
                  setValues({
                    ...values,
                    terms: list,
                  });
                }
              } else {
                toast.error("You can't remove all terms");
              }
            };
            // remove the perticular image to the term
            const removeTermImage = (index) => {
              let list = [...values.terms];
              list[index].image = "";
              setValues({
                ...values,
                terms: list,
              });
            };
            // change function for the file only
            const handleChangeFile = (e, index) => {
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = () => {
                let list = [...values.terms];
                list[index].image = reader.result;
                // setTerms(list);
                setValues({
                  ...values,
                  terms: list,
                });
              };
            };
            const removeGroupImage = () => {
              document.getElementById("file").value = null;
              setValues({ ...values, groupImage: "" });
            };
            useEffect(() => {
              console.log(values);
            }, [values]);

            return (
              <form onSubmit={handleSubmit}>
                <Tabs />
                <CreateGroupCard
                  handleBlur={handleBlur}
                  groupName={values.groupName}
                  groupImage={values.groupImage}
                  handleChangeGroupImage={handleChangeGroupImage}
                  handleChange={handleChange}
                  groupDescription={values.groupDescription}
                  removeGroupImage={removeGroupImage}
                />
                <AddTermsAndConditions
                  terms={values.terms}
                  addMore={addMore}
                  remove={remove}
                  removeTermImage={removeTermImage}
                  handleChangeTerm={handleChangeTerm}
                  handleChangeFile={handleChangeFile}
                  handleBlur={handleBlur}
                  errors={errors}
                />
                <CreateButton />
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default CreateFlashCard;
