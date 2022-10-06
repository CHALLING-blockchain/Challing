import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ContractAPI from "../../api/ContractAPI";
import Loading from "../common/Loading";

function PassCoinLoading() {
  const { id, cid } = useParams();
  const navigate = useNavigate();
  const [cnt, setCnt] = useState(-2);
  const [check, setCheck] = useState(0);
  const challenge = useLocation().state.challengeInfo;

  useEffect(() => {
    const Contract = new ContractAPI();
    async function load() {
      await Contract.findByChallengerId(Number(cid)).then((response) => {
        if (cnt === -2) setCnt(Number(response.totalCount));
        if (Number(response.totalCount) === cnt + 1) {
          navigate(`/challenge-certify/${id}`, {
            state: {
              challengeInfo: challenge,
              use: true,
            },
          });
        }
        setCheck(check + 1);
      });
    }

    load();
  }, [check]);

  return (
    <div>
      <Loading></Loading>
    </div>
  );
}

export default PassCoinLoading;
