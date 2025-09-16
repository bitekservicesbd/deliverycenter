import PageNav from '@/components/PageNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TopSearch = ({ className = '' }) => {
    return (
        <div className={className}>
            <PageNav>
                <div className="grid justify-end gap-4 py-3 pr-3 md:flex md:pr-0">
                    <div className="flex items-center">
                        <Label htmlFor="load" className="w-28 text-white">
                            {' '}
                            Load #
                        </Label>
                        <Input type="text" id="load" className="flex-1 bg-slate-100 dark:bg-zinc-700" />
                    </div>

                    <div className="flex items-center">
                        <Label htmlFor="reference" className="w-28 text-white">
                            {' '}
                            Reference #
                        </Label>
                        <Input type="text" id="reference" className="flex-1 bg-slate-100 dark:bg-zinc-700" />
                    </div>

                    <div className="md:mr-4">
                        <Button type="button" className="w-full bg-sky-900 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-950">
                            Search
                        </Button>
                    </div>
                </div>
            </PageNav>
        </div>
    );
};

export default TopSearch;
