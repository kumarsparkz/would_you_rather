import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Avatar, Button } from '@/shared/components';
import { formatDate } from '@/lib/utils';
import type { FormattedQuestion } from '@/lib/types';

interface QuestionCardProps {
  question: FormattedQuestion;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const viewLink = question.hasVoted
    ? `/questions/${question.id}/results`
    : `/questions/${question.id}`;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Avatar src={question.avatar} alt={question.name} size="sm" />
          <div>
            <p className="font-semibold">{question.name} asks:</p>
            <p className="text-sm text-gray-500">{formatDate(question.timestamp)}</p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-2">Would You Rather...</p>
            <div className="space-y-2">
              <p className="text-gray-800 truncate">
                {question.optionOne.text}
              </p>
              <p className="text-center text-gray-400 font-bold">OR</p>
              <p className="text-gray-800 truncate">
                {question.optionTwo.text}
              </p>
            </div>
          </div>
          <Link to={viewLink} className="block">
            <Button variant="outline" fullWidth>
              {question.hasVoted ? 'View Results' : 'Vote Now'}
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
