import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChallengeList } from "../../app/redux/allChallengeSlice";
import ContractAPI from "../../api/ContractAPI";

function CreateLoading() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [check, setCheck] = useState(0);

  useEffect(() => {
    async function load() {
      const Contract = new ContractAPI();
      await Contract.getAllChallenge().then((result) => {
        console.log("loading", Object.keys(result).length);

        setCheck(check + 1);

        if (Object.keys(result).length === Number(id)) {
          dispatch(setChallengeList(result));
          navigate(`/challenge-detail/${id}`);
        }
      });
    }
    load();
  });

  return (
    <div>
      <h2>로딩중</h2>
    </div>
  );
}

export default CreateLoading;
