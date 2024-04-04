import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // css do toast
import Loading from '../../../components/Loading';
import api from '../../../services/api';
import { IProps } from '../../../types';
import { useAuth } from '../../../hooks/hooksAuth';

export interface RequestDataForm {
  user_id?: string;
  request_key?: string;
}

export interface ConsultsData {
  request_key: string;
  user: string;
  situation: string;
  documentation: number;
  revision: number;
  bug: number;
  daily: number;
  update: number;
  service_forecast: number;
  commit: number;
  team_id: string;
  user_interpres_code: string;
  customer_name?:string;
}

export interface dataConsultCVSDetails {
  cvs: {
    program: [
      {
        file: string;
        revision: {
          before: string;
          after: string;
        },
        changes: [
          {
            before: {
              line: string;
              text: string;
            },
            after : {
              line: string;
              text: string;
            }
          }
        ]
      }
    ]
  }  
};

export interface dataConsultsDetails {
  status_description: string;
  description: string;
  attachment: [
    {
      name: string;
      description: string;
      insertion: string;
      user: string;
    }
  ];
  event: {
    status: {
      qty: number;
      start: string;
      history: [
        {
          message: string;
          date: string;
          datetime: string;
          user: string;
        }
      ];
      last: string;
    };
    qty: number;
    start: string;
    last: string;
  };
  cvs: {
    qty: number;
    program: [
      {
        version: string;
        file: string;
        user: string;
      }
    ];
  };
  message: string;
  planned_begin_time: string;
  planned_end_time: string;
  begin_time: string;
  end_time: string;
  io: {
    documentation: number;
    revision: number;
    bug: number;
    daily: number;
    update: number;
    service_forecast: number;
  };
}

interface HooksConsultsData {
  consultsData: ConsultsData[];
  setConsultsData(consultsData: ConsultsData[]): void;
  consultsGet(): void;
  list: boolean;
  setList(list: boolean): void;
  consultsPost(requestData: RequestDataForm): void;
  consultsPut(): void;
  consultsDetailsGet(requestData: RequestDataForm): void;
  dataDetails: dataConsultsDetails;
  setDataDetails(dataDetails: dataConsultsDetails): void;
  consultsDataCVS: dataConsultCVSDetails;
  setConsultsDataCVS(consultsData: dataConsultCVSDetails): void;
  consultCVSDetails(requestData: RequestDataForm):void;
}

const ConsultsContext = createContext<HooksConsultsData>({} as HooksConsultsData);

const ConsultsContextProvider: React.FC<IProps> = ({ children }) => {
  const {user} = useAuth();
  const [loading, setLoading] = useState(false);
  const [consultsData, setConsultsData] = useState<ConsultsData[]>({} as ConsultsData[]);
  const [list, setList] = useState(false);
  const [dataDetails, setDataDetails] = useState<dataConsultsDetails>({} as dataConsultsDetails);
  const [consultsDataCVS, setConsultsDataCVS] = useState<dataConsultCVSDetails>({} as dataConsultCVSDetails);

  const consultCVSDetails = useCallback(
    async (requestData: RequestDataForm) => {
     
      const data = await api.get(`consult/${requestData.request_key}/cvs`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }).catch((error) => {
        // console.log(error);
      });

      if ( data ) {
        console.log('data:',data.data);
        setConsultsDataCVS(data.data)
      }
      
    },
    [setDataDetails, setLoading,user]
  );

  const consultsGet = useCallback(async () => {
    setLoading(true);
    const data = await api
      .get('/consults', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .catch((error) => {
        //console.log(error);
      });

    if (data) {
      setConsultsData(data.data);
    }
    setList(true);
    setLoading(false);
  }, [setConsultsData, setList, setLoading, user]);

  const consultsPost = useCallback(
    async (requestData: RequestDataForm) => {
      const data = await api
        .post(
          `consult/${requestData.request_key}/${requestData.user_id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        )
        .catch((error) => {
          // console.log(error);
        });
      if (data) {
        consultsGet();
        toast.success('Consulta cadastrada com sucesso');
      }
    },
    [consultsGet, user]
  );

  const consultsPut = useCallback(async () => {
    setLoading(true);
    const data = await api
      .put(
        '/consults',
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      .catch((error) => {
        //console.log(error);
      });

    if (data) {
      setConsultsData(data.data);
    }
    setLoading(false);
  }, [setConsultsData, setLoading, user]);

  const consultsDetailsGet = useCallback(
    async (requestData: RequestDataForm) => {
      const data = await api
        .get(`consult/${requestData.request_key}/user/${requestData.user_id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        .catch((error) => {
          // console.log(error);
        });
      if (data) {
        setDataDetails(data.data);
      }
    },
    [setDataDetails, user]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <ConsultsContext.Provider
      value={{
        consultsGet,
        consultsData,
        setConsultsData,
        list,
        setList,
        consultsPost,
        consultsPut,
        consultsDetailsGet,
        dataDetails,
        setDataDetails,
        consultsDataCVS,
        setConsultsDataCVS,
        consultCVSDetails
      }}
    >
      {children}
    </ConsultsContext.Provider>
  );
};

function useConsults(): HooksConsultsData {
  const context = useContext(ConsultsContext);

  if (!context) {
    throw new Error('useConsults must be used within a useAuth');
  }
  return context;
}

export { ConsultsContextProvider, useConsults };
