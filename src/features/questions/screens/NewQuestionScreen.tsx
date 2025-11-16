import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useCreateQuestion } from '../hooks/useQuestions';
import { Button, Card, CardHeader, CardBody, Container, Textarea } from '@/shared/components';

const questionSchema = z.object({
  optionOneText: z.string().min(3, 'Option must be at least 3 characters').max(200, 'Option must be less than 200 characters'),
  optionTwoText: z.string().min(3, 'Option must be at least 3 characters').max(200, 'Option must be less than 200 characters'),
});

type QuestionFormData = z.infer<typeof questionSchema>;

export function NewQuestionScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createQuestion = useCreateQuestion();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: QuestionFormData) => {
    if (!user) return;

    try {
      await createQuestion.mutateAsync({
        ...data,
        author: user.id,
      });
      navigate('/');
    } catch (error) {
      console.error('Failed to create question:', error);
    }
  };

  return (
    <Container size="sm">
      <div className="space-y-6 py-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Create New Question</h1>
          <p className="text-gray-600">Pose a tough choice for the community!</p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Would You Rather...</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Textarea
                {...register('optionOneText')}
                label="Option 1"
                placeholder="e.g., have the ability to fly"
                rows={3}
                error={errors.optionOneText?.message}
              />

              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">OR</span>
              </div>

              <Textarea
                {...register('optionTwoText')}
                label="Option 2"
                placeholder="e.g., have the ability to become invisible"
                rows={3}
                error={errors.optionTwoText?.message}
              />

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="ghost"
                  fullWidth
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={!isValid}
                  isLoading={createQuestion.isPending}
                >
                  Create Question
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Tip:</strong> Great "Would You Rather" questions present two equally appealing or
            challenging options. Make both choices interesting!
          </p>
        </div>
      </div>
    </Container>
  );
}
