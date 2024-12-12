import React, { useState, useEffect, useRef } from 'react';
import { formatDateTime, formatDuration, formatNumber } from '../utils/formatters';
import { RequestDataType } from '../types';
import { STATUS_COLORS } from '../constants';

const RequestTile: React.FC<{ data: RequestDataType }> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setIsClamped(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [data.text]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const createdTime = new Date(data.createdDate).getTime();
  const completedTime = data.completionDate && new Date(data.completionDate).getTime();
  const durationInSeconds = completedTime && Math.floor((completedTime - createdTime) / 1000);

  return (
    <div className="max-w-sm mt-4 border rounded-xl shadow-md">

      <div className="flex items-center">
        <h2 className={`p-2 rounded-tl-xl rounded-br-xl font-bold mr-4 ${STATUS_COLORS[data.status]}`}>
          {formatNumber(data.number)}
        </h2>
        <div>
          <strong>{data.status}</strong>
          {data.isTechnological && <span className="ml-2">⚙️</span>}
        </div>
      </div>

      <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 p-4">
        <p>Создана:</p>
        <p>
          <strong>
            {formatDateTime(data.createdDate)}{' '}
            {data.completionDate && `(${formatDuration(typeof durationInSeconds === 'number' ? durationInSeconds : 0)})`}
          </strong>
        </p>

        {data.controlDate && !data.completionDate && (
          <>
            <p>Контроль:</p>
            <p>
              <strong>{formatDateTime(data.controlDate)}</strong>
            </p>
          </>
        )}

        {data.completionDate && (
          <>
            <p>Выполнена:</p>
            <p>
              <strong>{formatDateTime(data.completionDate)}</strong>
            </p>
          </>
        )}

        <p>Система:</p>
        <p>
          <strong>{data.system} | {data.requestType}</strong>
        </p>

        <p>Объект:</p>
        <p className="whitespace-pre-wrap">
          <strong>{data.object.name}, {data.object.city}, {data.object.street}</strong>
        </p>

        {data?.files && data.files.length > 0 && (
          <>
            <p>Файлы:</p>
            <div className="flex gap-2 flex-wrap">
              {data.files.map((file, index) => (
                <img
                  key={index}
                  src={file}
                  alt={`file-${index}`}
                  className="w-12 h-12 object-cover rounded"
                />
              ))}
            </div>
          </>
        )}
      </div>

      <hr className="mx-4"/>

      <div className="p-4">
        <div className={`relative overflow-hidden ${isExpanded ? '' : 'max-h-[4.5em]'}`}>
          <p
            ref={textRef}
            className={`transition-all ${isExpanded ? '' : 'line-clamp-3'}`}
          >
            {data.text}
          </p>
          {!isExpanded && isClamped && (
            <div className="absolute bottom-0 left-0 w-full h-[1.2em] bg-gradient-to-t from-white to-transparent"></div>
          )}
        </div>

        {isClamped && (
          <div className="text-center">
            <button
              className="bg-transparent border-none p-0 outline-none mt-2 text-orange-500 hover:text-orange-700 transition-all"
              onClick={toggleExpand}
            >
              {isExpanded ? '▲ Свернуть' : '▼ Читать далее'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestTile;
